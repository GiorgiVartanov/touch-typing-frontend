import { useOptimizationStore } from "../../../store/context/optimizationContext"
import { OptimizationConfig, ProcessStatus } from "../../../types/optimization.types"
import Button from "../../Form/Button"
import { useTranslation } from "react-i18next"
import RobotIcon from "../../../assets/icons/robot.svg?react"

interface Props {
  optimizationConfig: OptimizationConfig
  optimizationSubmit: (optimizationSubmit: OptimizationConfig) => void
}

const OptimizePanel = ({ optimizationConfig, optimizationSubmit }: Props) => {
  const { progress, optimizationStatus } = useOptimizationStore()
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const handleClick = () => {
    optimizationSubmit(optimizationConfig)
  }

  return (
    <div className="optimize-panel">
      <Button
        className="cta-button optimize-layout-button"
        onClick={handleClick}
      >
        <p>{t("Optimize Layout")}</p>
        <RobotIcon className="icon" />
      </Button>
      <div className="optimization-status">
        {optimizationStatus == ProcessStatus.initialization_started ? (
          <p>{t("Optimization process is being initialized")} . . .</p>
        ) : optimizationStatus == ProcessStatus.initialization_finished ? (
          <p>
            {t("Generations Complete")}:
            <span className="complete-generations">{progress.current_generation}</span> /{" "}
            <span className="total-generations">{progress.total_generations}</span>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default OptimizePanel
