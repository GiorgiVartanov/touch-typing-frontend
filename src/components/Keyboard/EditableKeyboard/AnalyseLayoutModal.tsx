import { useOptimizationStore } from "../../../store/context/optimizationContext"
import Modal from "../../Modal/Modal"

import { useTranslation } from "react-i18next"
import { OptimizationConfig } from "../../../types/optimization.types"

interface Props {
  isVisible: boolean
  closeModal: () => void
}

export const inBetweenCall = (
  optimizationConfig: OptimizationConfig,
  startAnalysis: (optimizationConfig: OptimizationConfig) => void
) => {
  startAnalysis(optimizationConfig)
}

const AnalyseLayoutModal = ({ isVisible, closeModal }: Props) => {
  const { analysis, setAnalysis } = useOptimizationStore()

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const handleCloseModal = () => {
    if (analysis) setAnalysis(undefined)
    closeModal()
  }

  const renderAnalyisResultTable = () => {
    if (!analysis) return
    return (
      <div className="analyze-modal">
        <div className="vertically-placed">
          <h2>{t("effort function values")}</h2>
        </div>
        <div className="two-columns">
          <div className="effort-info">
            <div></div>
            <div className="effort-values">
              <div>{t("Your")}</div>
              <div>Qwerty</div>
            </div>
          </div>
          <div className="effort-info">
            <div>{t("Total effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.total_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.total_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>{t("finger distance effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.finger_distance_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.finger_distance_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>{t("modifier overhead effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.modifier_overhead_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.modifier_overhead_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>{t("hand alternation effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.hand_alternation_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.hand_alternation_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div> {t("consecutive finger usage effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.consecutive_finger_usage_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.consecutive_finger_usage_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div> {t("same hand finger steps effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.same_hand_finger_steps_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.same_hand_finger_steps_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div> {t("hit direction effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.hit_direction_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.hit_direction_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>{t("left hand effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.left_hand_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.left_hand_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>{t("right hand effort")}: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.right_hand_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.right_hand_effort.toFixed(3)}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      isVisible={isVisible}
      closeModal={handleCloseModal}
    >
      {analysis == undefined ? (
        <></>
      ) : analysis.your_layout.total_effort == -1 ? (
        <p>{t("analysing your keyboard")}...</p>
      ) : analysis != undefined ? (
        renderAnalyisResultTable()
      ) : (
        <></>
      )}
    </Modal>
  )
}
export default AnalyseLayoutModal
