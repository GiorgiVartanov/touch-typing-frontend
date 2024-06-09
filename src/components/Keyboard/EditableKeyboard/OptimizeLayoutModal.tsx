import { useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import { useOptimizationStore } from "../../../store/context/optimizationContext"
import { initialOptimizationConfig } from "../../../store/initial/optimizationInitialState"
import { OptimizationConfig, ProcessStatus } from "../../../types/optimization.types"

import Modal from "../../../components/Modal/Modal"
import Form from "../../../components/Form/Form"
import Input from "../../../components/Form/Input"
import Select from "../../../components/Form/Select"
import TextArea from "../../../components/Form/TextArea"
import Button from "../../../components/Form/Button"

interface Props {
  isVisible: boolean
  closeModal: () => void
}

// modal to add optimize layout
const OptimizeLayoutModal = ({ isVisible, closeModal }: Props) => {
  const { progress, startOptimization, optimizationStatus } = useOptimizationStore()

  const [optimizationConfig, setOptimizationConfig] =
    useState<OptimizationConfig>(initialOptimizationConfig)

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
        <Button className="submit-button cta-button optimize-layout-button">
          {t("Optimize Layout")}
        </Button>
      </Form>
    </Modal>
  )
}
export default OptimizeLayoutModal
