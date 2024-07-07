// import { useEffect, useState } from "react"
// import { useTranslation } from "react-i18next"
// import { useOptimizationStore } from "../../../store/context/optimizationContext"
// import {
//   initialOptimizationConfig,
//   punctuationPlacements,
// } from "../../../store/initial/optimizationInitialState"
// import {
//   OptimizationConfig,
//   ProcessStatus,
//   PunctuationPlacement,
// } from "../../../types/optimization.types"

// import Tooltip from "../../Tooltip/Tooltip"
// import Slider from "../../Form/Slider"
// import Form from "../../Form/Form"
// import Input from "../../Form/Input"
// import Button from "../../Form/Button"
// import { KeyInterface } from "../../../types/keyboard.types"
// import { convertFromCurrentLayoutToPythonApi } from "../../../util/keyboardLayoutConverter"

// interface Props {
//   optimizationSubmit: (optimizationSubmit: OptimizationConfig) => void
// }

// const PunctPlaceModes = [0, 1, 2, 3, 4]
// const PunctPlaceModesText: { [key: number]: string } = {
//   0: "Qwerty",
//   1: "Dvorjak",
//   2: "Left",
//   3: "Middle row free",
//   4: "Spread",
// }

// // modal to add optimize layout
// const OptimizeLayoutPanel = ({ optimizationSubmit }: Props) => {
//   const { progress, startOptimization, optimizationStatus } = useOptimizationStore()
//   const [moreDetails, setMoreDetails] = useState<boolean>(false)

//   //console.log("right here", editingKeyboard)
//   const [optimizationConfig, setOptimizationConfig] = useState<OptimizationConfig>({
//     ...initialOptimizationConfig,
//   })

//   //useEffect(() => {}, [optimizationConfig])

//   const [punctuationPlacementMode, setPunctuationPlacementMode] = useState<PunctuationPlacement>(
//     PunctuationPlacement.qwerty
//   )

//   const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     //startOptimization(optimizationConfig)
//     //optimizationSubmit(optimizationConfig)
//   }

//   return (
//     <div className="optimize-layout-panel">
//       {optimizationStatus == ProcessStatus.initialization_started ? (
//         <p>Optimization process is being initialized</p>
//       ) : optimizationStatus == ProcessStatus.initialization_finished ? (
//         <p>
//           Generations Complete: {progress.current_generation} / {progress.total_generations}
//         </p>
//       ) : (
//         <></>
//       )}
//       <Form
//         onSubmit={handleSubmit}
//         className="optimize-layout-form"
//       >
//         <div className="input-fields">
//           <Tooltip
//             tooltipContent="number of generations"
//             tooltipPosition="left"
//           >
//             <Input
//               name={t("number of generations")}
//               type="number"
//               value={optimizationConfig.number_of_generations}
//               onChange={(e) => {
//                 const value = Number(e.target.value)
//                 let valueToApply = value

//                 if (value < 0) {
//                   valueToApply = 0
//                 }

//                 if (value > 1000) {
//                   valueToApply = 1000
//                 }

//                 setOptimizationConfig((prevstate) => ({
//                   ...prevstate,
//                   number_of_generations: Number(valueToApply),
//                 }))
//               }}
//             />
//           </Tooltip>
//           <Tooltip
//             tooltipContent="finger distance weight"
//             tooltipPosition="right"
//           >
//             <Input
//               name={t("finger distance weight")}
//               type="number"
//               value={optimizationConfig.effort_parameters.finger_distance_weight.weight}
//               onChange={(e) => {
//                 const value = Number(e.target.value)
//                 let valueToApply = value

//                 if (value < 0) {
//                   valueToApply = 0
//                 }

//                 if (value > 20) {
//                   valueToApply = 20
//                 }

//                 setOptimizationConfig((prevState) => ({
//                   ...prevState,
//                   effort_parameters: {
//                     ...prevState.effort_parameters,
//                     finger_distance_weight: {
//                       ...prevState.effort_parameters.finger_distance_weight,
//                       weight: Number(valueToApply),
//                     },
//                   },
//                 }))
//               }}
//             />
//           </Tooltip>
//           <Tooltip
//             tooltipContent="modifier overhead weight"
//             tooltipPosition="left"
//           >
//             <Input
//               name={t("modifier overhead weight")}
//               type="number"
//               value={optimizationConfig.effort_parameters.modifier_overhead_weight}
//               onChange={(e) => {
//                 const value = Number(e.target.value)
//                 let valueToApply = value

//                 if (value < 0) {
//                   valueToApply = 0
//                 }

//                 if (value > 20) {
//                   valueToApply = 20
//                 }

//                 setOptimizationConfig((prevState) => ({
//                   ...prevState,
//                   effort_parameters: {
//                     ...prevState.effort_parameters,
//                     modifier_overhead_weight: Number(valueToApply),
//                   },
//                 }))
//               }}
//             />
//           </Tooltip>
//           {moreDetails ? (
//             <>
//               <Tooltip
//                 tooltipContent="hit direction weight"
//                 tooltipPosition="right"
//               >
//                 <Input
//                   name={t("hit direction weight")}
//                   type="number"
//                   value={optimizationConfig.effort_parameters.hit_direction_weight}
//                   onChange={(e) => {
//                     const value = Number(e.target.value)
//                     let valueToApply = value

//                     if (value < 0) {
//                       valueToApply = 0
//                     }

//                     if (value > 20) {
//                       valueToApply = 20
//                     }

//                     setOptimizationConfig((prevState) => ({
//                       ...prevState,
//                       effort_parameters: {
//                         ...prevState.effort_parameters,
//                         hit_direction_weight: Number(valueToApply),
//                       },
//                     }))
//                   }}
//                 />
//               </Tooltip>
//               <Tooltip
//                 tooltipContent="hand alternation weight"
//                 tooltipPosition="left"
//               >
//                 <Input
//                   name={t("hand alternation weight")}
//                   type="number"
//                   value={optimizationConfig.effort_parameters.hand_alternation_weight}
//                   onChange={(e) => {
//                     const value = Number(e.target.value)
//                     let valueToApply = value

//                     if (value < 0) {
//                       valueToApply = 0
//                     }

//                     if (value > 20) {
//                       valueToApply = 20
//                     }

//                     setOptimizationConfig((prevState) => ({
//                       ...prevState,
//                       effort_parameters: {
//                         ...prevState.effort_parameters,
//                         hand_alternation_weight: Number(valueToApply),
//                       },
//                     }))
//                   }}
//                 />
//               </Tooltip>
//               <Tooltip
//                 tooltipContent="consecutive finger usage weight"
//                 tooltipPosition="right"
//               >
//                 <Input
//                   name={t("consecutive finger usage weight")}
//                   type="number"
//                   value={optimizationConfig.effort_parameters.consecutive_finger_usage_weight}
//                   onChange={(e) => {
//                     const value = Number(e.target.value)
//                     let valueToApply = value

//                     if (value < 0) {
//                       valueToApply = 0
//                     }

//                     if (value > 20) {
//                       valueToApply = 20
//                     }

//                     setOptimizationConfig((prevState) => ({
//                       ...prevState,
//                       effort_parameters: {
//                         ...prevState.effort_parameters,
//                         consecutive_finger_usage_weight: Number(valueToApply),
//                       },
//                     }))
//                   }}
//                 />
//               </Tooltip>
//               <Tooltip
//                 tooltipContent="finger distance weight"
//                 tooltipPosition="left"
//               >
//                 <Input
//                   name={t("finger distance weight")}
//                   type="number"
//                   value={optimizationConfig.effort_parameters.same_hand_finger_steps_weight}
//                   onChange={(e) => {
//                     const value = Number(e.target.value)

//                     if (0 < value && value > 20) return

//                     setOptimizationConfig((prevState) => ({
//                       ...prevState,
//                       effort_parameters: {
//                         ...prevState.effort_parameters,
//                         same_hand_finger_steps_weight: Number(value),
//                       },
//                     }))
//                   }}
//                 />
//               </Tooltip>
//             </>
//           ) : (
//             <></>
//           )}
//         </div>
//         {moreDetails ? (
//           <>
//             <Slider
//               name={"left to right ratio"}
//               minimalValue={0}
//               maximumValue={2.0}
//               step={0.01}
//               value={optimizationConfig.effort_parameters.hand_weights.left}
//               onChange={(newValue) => {
//                 setOptimizationConfig((prevState) => ({
//                   ...prevState,
//                   effort_parameters: {
//                     ...prevState.effort_parameters,
//                     hand_weights: {
//                       left: Number(newValue),
//                       right: 2 - Number(newValue),
//                     },
//                   },
//                 }))
//               }}
//             />
//             <label>
//               {t("punctation placement variants")}
//               <select
//                 id={"PunctPlace_id"}
//                 value={punctuationPlacementMode}
//                 onChange={(e) => {
//                   setPunctuationPlacementMode(Number(e.target.value) as PunctuationPlacement)
//                   setOptimizationConfig((prevState) => ({
//                     ...prevState,
//                     punctuation_placement:
//                       punctuationPlacements[Number(e.target.value) as PunctuationPlacement],
//                   }))
//                 }}
//               >
//                 {PunctPlaceModes.map((mode) => (
//                   <option
//                     key={mode}
//                     value={mode}
//                   >
//                     {t(PunctPlaceModesText[mode])}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </>
//         ) : (
//           <Button onClick={() => setMoreDetails(true)}>more details...</Button>
//         )}
//         {moreDetails ? (
//           <Button onClick={() => setMoreDetails(false)}>less details...</Button>
//         ) : (
//           <></>
//         )}
//         <Button className="submit-button cta-button optimize-layout-button">
//           {t("Optimize Layout")}
//         </Button>
//       </Form>
//     </div>
//   )
// }
// export default OptimizeLayoutPanel
