import { useOptimizationStore } from "../../../store/context/optimizationContext"
import { OptimizationConfig, ProcessStatus } from "../../../types/optimization.types"
import Button from "../../Form/Button"
import { useTranslation } from "react-i18next"

interface Props {
  optimizationConfig: OptimizationConfig
  optimizationSubmit: (optimizationSubmit: OptimizationConfig) => void
}

const OptimizePanel = ({ optimizationConfig, optimizationSubmit }: Props) => {
  const { progress, startOptimization, optimizationStatus } = useOptimizationStore()
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const handleClick = () => {
    optimizationSubmit(optimizationConfig)
  }

  return (
    <div>
      <Button
        className="cta-button optimize-layout-button"
        onClick={handleClick}
      >
        {t("Optimize Layout")}
      </Button>
      {optimizationStatus == ProcessStatus.initialization_started ? (
        <p>Optimization process is being initialized</p>
      ) : optimizationStatus == ProcessStatus.initialization_finished ? (
        <p>
          Generations Complete: {progress.current_generation} / {progress.total_generations}
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default OptimizePanel
