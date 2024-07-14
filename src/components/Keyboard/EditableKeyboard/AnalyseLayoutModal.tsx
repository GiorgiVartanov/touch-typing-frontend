import { useOptimizationStore } from "../../../store/context/optimizationContext"
import Modal from "../../Modal/Modal"
import Button from "../../Form/Button"

import { useTranslation } from "react-i18next"
import Form from "../../Form/Form"
import { useEffect, useState } from "react"
import { OptimizationConfig } from "../../../types/optimization.types"
import { initialOptimizationConfig } from "../../../store/initial/optimizationInitialState"
import { KeyInterface } from "../../../types/keyboard.types"
import {
  convertFromCurrentLayoutToPythonApi,
  validateKeyboardLayout,
} from "../../../util/keyboardLayoutConverter"
import { toast } from "react-toastify"

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
  const { analysis, setAnalysis, startAnalysis } = useOptimizationStore()
  console.log(analysis)
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  // const [optimizationConfig, setOptimizationConfig] = useState<OptimizationConfig>({
  //   ...initialOptimizationConfig,
  //   characters_set: convertFromCurrentLayoutToPythonApi(
  //     editingKeyboard,
  //     initialOptimizationConfig.punctuation_placement
  //   ),
  // })

  //useEffect(() => {}, [])
  //startAnalysis(optimizationConfig)

  const handleCloseModal = () => {
    if (analysis) setAnalysis(undefined)
    closeModal()
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   startAnalysis(optimizationConfig)
  // }

  const renderAnalyisResultTable = () => {
    if (!analysis) return
    return (
      <div className="analyze-modal">
        <div className="vertically-placed">
          <h2>effort function values</h2>
        </div>
        <div className="two-columns">
          <div className="effort-info">
            <div></div>
            <div className="effort-values">
              <div>Your</div>
              <div>Qwerty</div>
            </div>
          </div>
          <div className="effort-info">
            <div>Total effort: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.total_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.total_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>finger distance effort: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.finger_distance_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.finger_distance_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>modifier overhead effort: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.modifier_overhead_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.modifier_overhead_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div>hand alternation effort: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.hand_alternation_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.hand_alternation_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div> consecutive finger usage effort: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.consecutive_finger_usage_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.consecutive_finger_usage_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div> same hand finger stedivs effort: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.same_hand_finger_steps_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.same_hand_finger_steps_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            <div> hit direction weight: </div>
            <div className="effort-values">
              <div>{analysis.your_layout.hit_direction_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.hit_direction_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            left hand effort:{" "}
            <div className="effort-values">
              <div>{analysis.your_layout.left_hand_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.left_hand_effort.toFixed(3)}</div>
            </div>
          </div>
          <div className="effort-info">
            right hand effort:{" "}
            <div className="effort-values">
              <div>{analysis.your_layout.right_hand_effort.toFixed(3)}</div>
              <div>{analysis.qwerty.right_hand_effort.toFixed(3)}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //startAnalysis(optimizationConfig)
  return (
    <Modal
      isVisible={isVisible}
      closeModal={handleCloseModal}
    >
      {analysis == undefined ? (
        <></>
      ) : analysis.your_layout.total_effort == -1 ? (
        <p>analysing your keyboard...</p>
      ) : analysis != undefined ? (
        renderAnalyisResultTable()
      ) : (
        <></>
      )}
      {/* <Form onSubmit={handleSubmit}>
          <Button className="submit-button cta-button optimize-layout-button">
            {t("Analyse Layout")}
          </Button>
        </Form> */}
    </Modal>
  )
}
export default AnalyseLayoutModal
