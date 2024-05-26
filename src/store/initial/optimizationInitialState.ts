import { OptimizationState, OptimizationProgress } from "../../types/optimization.types"
import config from "../../keyboardLayouts/config.json"

export const optimizationProgressInitialState: OptimizationProgress = {
  current_generation: 0,
  total_generations: config.number_of_generations,
}

export const optimizationInitialState: OptimizationState = {
  socket: undefined,
  optimizationStatus: false,
  progress: optimizationProgressInitialState,
  optimizedEditingKeyboard: undefined,
}
