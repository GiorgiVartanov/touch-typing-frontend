import { useOptimizationStore } from "../../../store/context/optimizationContext"
import Modal from "../../Modal/Modal"
import Button from "../../Form/Button"

import { useTranslation } from "react-i18next"
import Form from "../../Form/Form"
import { useState } from "react"
import { OptimizationConfig } from "../../../types/optimization.types"
import { initialOptimizationConfig } from "../../../store/initial/optimizationInitialState"
import { KeyInterface } from "../../../types/keyboard.types"
import { convertFromCurrentLayoutToPythonApi } from "../../../util/keyboardLayoutConverter"

interface Props {
  isVisible: boolean
  closeModal: () => void
  editingKeyboard: KeyInterface[]
}

const AnalyseLayoutModal = ({ isVisible, closeModal, editingKeyboard }: Props) => {
  const { analysis, setAnalysis, startAnalysis } = useOptimizationStore()

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const [optimizationConfig, setOptimizationConfig] = useState<OptimizationConfig>({
    ...initialOptimizationConfig,
    characters_set: convertFromCurrentLayoutToPythonApi(editingKeyboard),
  })

  const handleCloseModal = () => {
    if (analysis) setAnalysis(undefined)
    closeModal()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startAnalysis(optimizationConfig)
  }

  return (
    <Modal
      isVisible={isVisible}
      closeModal={handleCloseModal}
    >
      {analysis == -1 ? (
        <p>analysing your keyboard...</p>
      ) : analysis != undefined ? (
        <p>your layout has got: {analysis}. in reference, QWERTY has: ???, DVORJAK has: ?!?</p>
      ) : (
        <></>
      )}
      <Form onSubmit={handleSubmit}>
        <Button className="submit-button cta-button optimize-layout-button">
          {t("Analyse Layout")}
        </Button>
      </Form>
    </Modal>
  )
}
export default AnalyseLayoutModal
