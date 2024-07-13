import { useEffect, useState } from "react"
import {
  initialOptimizationConfig,
  punctuationPlacements,
} from "../../../store/initial/optimizationInitialState"
import { OptimizationConfig, PunctuationPlacement } from "../../../types/optimization.types"
import Form from "../../Form/Form"
import Tooltip from "../../Tooltip/Tooltip"
import Input from "../../Form/Input"
import { useTranslation } from "react-i18next"
import Slider from "../../Form/Slider"
import Button from "../../Form/Button"
import OptimizePanel from "./OptimizePanel"
import AnalysePanel from "./AnalysePanel"
import { KeyInterface } from "../../../types/keyboard.types"
import { convertFromCurrentLayoutToPythonApi } from "../../../util/keyboardLayoutConverter"
import { punctuationLayouts } from "../../../store/initial/typingSettingsInitialState"

const PunctPlaceModes = [0, 1, 2, 3, 4]
const PunctPlaceModesText: { [key in PunctuationPlacement]: string } = {
  [PunctuationPlacement.qwerty]: "qwerty",
  [PunctuationPlacement.dvorjak]: "dvorjak",
  [PunctuationPlacement.left]: "left",
  [PunctuationPlacement.middle_free]: "middle_free",
  [PunctuationPlacement.spread]: "spread",
}

interface Props {
  optimizationSubmit: (optimizationSubmit: OptimizationConfig) => void
  analysisSubmit: (optimizationSubmit: OptimizationConfig) => void
  validateLayout: () => boolean
  changePunctuation: (punctuation: KeyInterface[]) => void
}

const EffortConfigurator = ({
  optimizationSubmit,
  analysisSubmit,
  validateLayout,
  changePunctuation,
}: Props) => {
  const [moreDetails, setMoreDetails] = useState<boolean>(false)

  const [optimizationConfig, setOptimizationConfig] = useState<OptimizationConfig>({
    ...initialOptimizationConfig,
  })

  const [punctuationPlacementMode, setPunctuationPlacementMode] = useState<PunctuationPlacement>(
    PunctuationPlacement.qwerty
  )

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="configurator-layout-panel">
      <Form
        onSubmit={handleSubmit}
        className="configurator-layout-form"
      >
        <div className="input-fields">
          <Tooltip
            tooltipContent="number of generations"
            tooltipPosition="top-right"
          >
            <Input
              name={t("number of generations")}
              type="number"
              value={optimizationConfig.number_of_generations}
              onChange={(e) => {
                const value = Number(e.target.value)
                let valueToApply = value

                if (value < 0) {
                  valueToApply = 0
                }

                if (value > 1000) {
                  valueToApply = 1000
                }

                setOptimizationConfig((prevstate) => ({
                  ...prevstate,
                  number_of_generations: Number(valueToApply),
                }))
              }}
            />
          </Tooltip>
          <Tooltip
            tooltipContent="finger distance weight"
            tooltipPosition="top-right"
          >
            <Input
              name={t("finger distance weight")}
              type="number"
              value={optimizationConfig.effort_parameters.finger_distance_weight.weight}
              onChange={(e) => {
                const value = Number(e.target.value)
                let valueToApply = value

                if (value < 0) {
                  valueToApply = 0
                }

                if (value > 20) {
                  valueToApply = 20
                }

                setOptimizationConfig((prevState) => ({
                  ...prevState,
                  effort_parameters: {
                    ...prevState.effort_parameters,
                    finger_distance_weight: {
                      ...prevState.effort_parameters.finger_distance_weight,
                      weight: Number(valueToApply),
                    },
                  },
                }))
              }}
            />
          </Tooltip>
          <Tooltip
            tooltipContent="modifier overhead weight"
            tooltipPosition="top-right"
          >
            <Input
              name={t("modifier overhead weight")}
              type="number"
              value={optimizationConfig.effort_parameters.modifier_overhead_weight}
              onChange={(e) => {
                const value = Number(e.target.value)
                let valueToApply = value

                if (value < 0) {
                  valueToApply = 0
                }

                if (value > 20) {
                  valueToApply = 20
                }

                setOptimizationConfig((prevState) => ({
                  ...prevState,
                  effort_parameters: {
                    ...prevState.effort_parameters,
                    modifier_overhead_weight: Number(valueToApply),
                  },
                }))
              }}
            />
          </Tooltip>
          {moreDetails ? (
            <>
              <Tooltip
                tooltipContent="hit direction weight"
                tooltipPosition="left"
              >
                <Input
                  name={t("hit direction weight")}
                  type="number"
                  value={optimizationConfig.effort_parameters.hit_direction_weight}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    let valueToApply = value

                    if (value < 0) {
                      valueToApply = 0
                    }

                    if (value > 20) {
                      valueToApply = 20
                    }

                    setOptimizationConfig((prevState) => ({
                      ...prevState,
                      effort_parameters: {
                        ...prevState.effort_parameters,
                        hit_direction_weight: Number(valueToApply),
                      },
                    }))
                  }}
                />
              </Tooltip>
              <Tooltip
                tooltipContent="hand alternation weight"
                tooltipPosition="bottom-right"
              >
                <Input
                  name={t("hand alternation weight")}
                  type="number"
                  value={optimizationConfig.effort_parameters.hand_alternation_weight}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    let valueToApply = value

                    if (value < 0) {
                      valueToApply = 0
                    }

                    if (value > 20) {
                      valueToApply = 20
                    }

                    setOptimizationConfig((prevState) => ({
                      ...prevState,
                      effort_parameters: {
                        ...prevState.effort_parameters,
                        hand_alternation_weight: Number(valueToApply),
                      },
                    }))
                  }}
                />
              </Tooltip>
              <Tooltip
                tooltipContent="consecutive finger usage weight"
                tooltipPosition="bottom-right"
              >
                <Input
                  name={t("consecutive finger usage weight")}
                  type="number"
                  value={optimizationConfig.effort_parameters.consecutive_finger_usage_weight}
                  onChange={(e) => {
                    const value = Number(e.target.value)
                    let valueToApply = value

                    if (value < 0) {
                      valueToApply = 0
                    }

                    if (value > 20) {
                      valueToApply = 20
                    }

                    setOptimizationConfig((prevState) => ({
                      ...prevState,
                      effort_parameters: {
                        ...prevState.effort_parameters,
                        consecutive_finger_usage_weight: Number(valueToApply),
                      },
                    }))
                  }}
                />
              </Tooltip>
              <Tooltip
                tooltipContent="finger distance weight"
                tooltipPosition="bottom-right"
              >
                <Input
                  name={t("finger distance weight")}
                  type="number"
                  value={optimizationConfig.effort_parameters.same_hand_finger_steps_weight}
                  onChange={(e) => {
                    const value = Number(e.target.value)

                    if (0 < value && value > 20) return

                    setOptimizationConfig((prevState) => ({
                      ...prevState,
                      effort_parameters: {
                        ...prevState.effort_parameters,
                        same_hand_finger_steps_weight: Number(value),
                      },
                    }))
                  }}
                />
              </Tooltip>
            </>
          ) : (
            <></>
          )}
        </div>
        {moreDetails ? (
          <>
            <Slider
              name={"left to right ratio"}
              minimalValue={0}
              maximumValue={2.0}
              step={0.01}
              value={optimizationConfig.effort_parameters.hand_weights.left}
              onChange={(newValue) => {
                setOptimizationConfig((prevState) => ({
                  ...prevState,
                  effort_parameters: {
                    ...prevState.effort_parameters,
                    hand_weights: {
                      left: Number(newValue),
                      right: 2 - Number(newValue),
                    },
                  },
                }))
              }}
            />
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

                  const index = PunctPlaceModesText[Number(e.target.value) as PunctuationPlacement]
                  changePunctuation(punctuationLayouts[index].keyboard)
                }}
              >
                {PunctPlaceModes.map((mode) => (
                  <option
                    key={mode}
                    value={mode}
                  >
                    {t(PunctPlaceModesText[mode as PunctuationPlacement])}
                  </option>
                ))}
              </select>
            </label>
          </>
        ) : (
          <Button
            className="show-more-details-button"
            onClick={() => setMoreDetails(true)}
          >
            show more...
          </Button>
        )}
        {moreDetails ? (
          <Button
            className="show-more-details-button"
            onClick={() => setMoreDetails(false)}
          >
            show less...
          </Button>
        ) : (
          <></>
        )}
        <div className="effort-usages">
          <OptimizePanel
            optimizationConfig={optimizationConfig}
            optimizationSubmit={optimizationSubmit}
          />
          <AnalysePanel
            optimizationConfig={optimizationConfig}
            analysisSubmit={analysisSubmit}
            validateLayout={validateLayout}
          />
        </div>
        {/* <Button className="submit-button cta-button optimize-layout-button">
          {t("Optimize Layout")}
        </Button> */}
      </Form>
    </div>
  )
}

export default EffortConfigurator
