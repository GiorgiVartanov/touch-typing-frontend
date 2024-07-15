import { useTranslation } from "react-i18next"
import { validateKeyboardLayout } from "../../../util/keyboardLayoutConverter"
import Button from "../../Form/Button"
import { useState } from "react"
import AnalyseLayoutModal from "./AnalyseLayoutModal"
import { OptimizationConfig } from "../../../types/optimization.types"
import { toast } from "react-toastify"
import AnalyzeIcon from "../../../assets/icons/analyze.svg?react"

interface Props {
  optimizationConfig: OptimizationConfig
  analysisSubmit: (optimizationSubmit: OptimizationConfig) => void
  validateLayout: () => boolean
}

const AnalysePanel = ({ optimizationConfig, analysisSubmit, validateLayout }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })
  const [isAnalyseModalOpen, setIsAnalyseModalOpen] = useState<boolean>(false)

  const handleClick = () => {
    if (validateLayout()) {
      setIsAnalyseModalOpen(true)
      analysisSubmit(optimizationConfig)
    } else {
      toast.warning(t("your keyboard layout doesn't contain all the symbols"))
      handleCloseAnalysisModal()
    }
  }

  const handleCloseAnalysisModal = () => {
    setIsAnalyseModalOpen(false)
  }

  return (
    <div>
      <Button
        className="cta-button optimize-layout-button"
        onClick={handleClick}
      >
        <p>{t("Analyse Layout")}</p>
        <AnalyzeIcon className="icon" />
      </Button>
      {isAnalyseModalOpen ? (
        <AnalyseLayoutModal
          isVisible={isAnalyseModalOpen}
          closeModal={handleCloseAnalysisModal}
        />
      ) : (
        <></>
      )}
    </div>
  )
}

export default AnalysePanel
