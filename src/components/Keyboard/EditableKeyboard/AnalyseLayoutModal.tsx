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
  editingKeyboard: KeyInterface[]
}

export const inBetweenCall = (
  optimizationConfig: OptimizationConfig,
  startAnalysis: (optimizationConfig: OptimizationConfig) => void
) => {
  startAnalysis(optimizationConfig)
}

const AnalyseLayoutModal = ({ isVisible, closeModal, editingKeyboard }: Props) => {
  const { analysis, setAnalysis, startAnalysis } = useOptimizationStore()

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const [optimizationConfig, setOptimizationConfig] = useState<OptimizationConfig>({
    ...initialOptimizationConfig,
    characters_set: convertFromCurrentLayoutToPythonApi(
      editingKeyboard,
      initialOptimizationConfig.punctuation_placement
    ),
  })

  //useEffect(() => {}, [])
  //startAnalysis(optimizationConfig)

  const handleCloseModal = () => {
    if (analysis) setAnalysis(undefined)
    closeModal()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    startAnalysis(optimizationConfig)
  }

  const renderAnalyisResultTable = () => {
    if (!analysis) return
    return (
      <div>
        <div className="vertically placed">
          <h2>effort values</h2>
          <div className="horizontally-placed">
            <p>Your layout: {analysis.total_effort}</p>
            <p>qwerty layout: {analysis.qwerty_effort}</p>
          </div>
        </div>
        <div className="two columns">
          <p>finger distance effort: {analysis.finger_distance_effort}</p>
          <p>modifier overhead effort: {analysis.modifier_overhead_effort}</p>
          <p>hand alternation effort: {analysis.hand_alternation_effort}</p>
          <p>consecutive finger usage effort: {analysis.consecutive_finger_usage_effort}</p>
          <p>same hand finger steps effort: {analysis.same_hand_finger_steps_effort}</p>
          <p>hit direction weight: {analysis.hit_direction_effort}</p>
          <div className="below all horizontal">
            <h2>left hand effort: {analysis.left_hand_effort}</h2>
            <h2>right hand effort: {analysis.right_hand_effort}</h2>
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
      ) : analysis.total_effort == -1 ? (
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
