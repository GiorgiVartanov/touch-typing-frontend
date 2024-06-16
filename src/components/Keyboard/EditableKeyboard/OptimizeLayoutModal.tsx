import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useOptimizationStore } from "../../../store/context/optimizationContext"
import {
  initialOptimizationConfig,
  punctuationPlacements,
} from "../../../store/initial/optimizationInitialState"
import {
  OptimizationConfig,
  ProcessStatus,
  PunctuationPlacement,
} from "../../../types/optimization.types"

import Modal from "../../../components/Modal/Modal"
import Form from "../../../components/Form/Form"
import Input from "../../../components/Form/Input"
import Button from "../../../components/Form/Button"
import Select from "../../Form/Select"

interface Props {
  isVisible: boolean
  closeModal: () => void
}

const PunctPlaceModes = [0, 1, 2, 3, 4, 5]
const PunctPlaceModesText: { [key: number]: string } = {
  0: "Custom",
  1: "Qwerty",
  2: "Dvorjak",
  3: "Left",
  4: "Middle row free",
  5: "Spread",
}

// modal to add optimize layout
const OptimizeLayoutModal = ({ isVisible, closeModal }: Props) => {
  const { progress, startOptimization, optimizationStatus } = useOptimizationStore()

  const [optimizationConfig, setOptimizationConfig] =
    useState<OptimizationConfig>(initialOptimizationConfig)
  const [punctuationPlacementMode, setPunctuationPlacementMode] = useState<PunctuationPlacement>(
    PunctuationPlacement.qwerty
  )

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    startOptimization(optimizationConfig)
  }

  return (
    <Modal
      isVisible={isVisible}
      closeModal={closeModal}
      showCloseButton={true}
      className="optimize-layout"
      modalTitle={t("Optimize Layout")}
    >
      {optimizationStatus == ProcessStatus.initialization_started ? (
        <p>Optimization process is being initialized</p>
      ) : optimizationStatus == ProcessStatus.initialization_finished ? (
        <p>
          Generations Complete: {progress.current_generation} / {progress.total_generations}
        </p>
      ) : (
        <></>
      )}
      <Form
        onSubmit={handleSubmit}
        className="optimize-layout-form"
      >
        <Input
          name={t("number of generations")}
          type="number"
          value={optimizationConfig.number_of_generations}
          onChange={(e) => {
            setOptimizationConfig((prevstate) => ({
              ...prevstate,
              number_of_generations: Number(e.target.value),
            }))
          }}
        ></Input>
        <Input
          name={t("finger distance weight")}
          type="number"
          value={optimizationConfig.effort_parameters.finger_distance_weight.weight}
          onChange={(e) => {
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                finger_distance_weight: {
                  ...prevState.effort_parameters.finger_distance_weight,
                  weight: Number(e.target.value),
                },
              },
            }))
          }}
        ></Input>
        <Input
          name={t("modifier overhead weight")}
          type="number"
          value={optimizationConfig.effort_parameters.modifier_overhead_weight}
          onChange={(e) => {
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                modifier_overhead_weight: Number(e.target.value),
              },
            }))
          }}
        ></Input>
        <Input
          name={t("hit direction weight")}
          type="number"
          value={optimizationConfig.effort_parameters.hit_direction_weight}
          onChange={(e) => {
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                hit_direction_weight: Number(e.target.value),
              },
            }))
          }}
        ></Input>
        <Input
          name={t("hand alternation weight")}
          type="number"
          value={optimizationConfig.effort_parameters.hand_alternation_weight}
          onChange={(e) => {
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                hand_alternation_weight: Number(e.target.value),
              },
            }))
          }}
        ></Input>
        <Input
          name={t("consecutive finger usage weight")}
          type="number"
          value={optimizationConfig.effort_parameters.consecutive_finger_usage_weight}
          onChange={(e) => {
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                consecutive_finger_usage_weight: Number(e.target.value),
              },
            }))
          }}
        ></Input>
        <Input
          name={t("same hand finger steps weight")}
          type="number"
          value={optimizationConfig.effort_parameters.same_hand_finger_steps_weight}
          onChange={(e) => {
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                same_hand_finger_steps_weight: Number(e.target.value),
              },
            }))
          }}
        ></Input>
        <Input
          type="number"
          name={t("left to right ratio")}
          value={optimizationConfig.effort_parameters.hand_weights.left}
          onChange={(e) =>
            setOptimizationConfig((prevState) => ({
              ...prevState,
              effort_parameters: {
                ...prevState.effort_parameters,
                hand_weights: {
                  left: Number(e.target.value),
                  right: 2 - Number(e.target.value),
                },
              },
            }))
          }
        ></Input>
        {/* <Select
          name={t("punctation placement variants")}
          value={String(optimizationConfig.punctuation_placement)}
          options={[]}
          optionsToShow={[]}
          onChange={function (value: string): void {
            throw new Error("Function not implemented.")
          }}
        /> */}
        <label>
          {t("punctation placement variants")}
          <select
            id={"PunctPlace_id"}
            value={punctuationPlacementMode}
            onChange={(e) => {
              setPunctuationPlacementMode(Number(e.target.value) as PunctuationPlacement)
              setOptimizationConfig((prevState) => ({
                ...prevState,
                punctuation_placement:
                  punctuationPlacements[Number(e.target.value) as PunctuationPlacement],
              }))
            }}
          >
            {PunctPlaceModes.map((mode) => (
              <option
                key={mode}
                value={mode}
              >
                {t(PunctPlaceModesText[mode])}
              </option>
            ))}
          </select>
        </label>
        <Button className="submit-button cta-button optimize-layout-button">
          {t("Optimize Layout")}
        </Button>
      </Form>
    </Modal>
  )
}
export default OptimizeLayoutModal
