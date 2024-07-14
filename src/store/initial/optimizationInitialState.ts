import {
  OptimizationState,
  OptimizationProgress,
  OptimizationConfig,
  ProcessStatus,
  PunctuationPlacement,
  PunctuationPlacementDictionary,
  Analysis,
  AnalysisSpecific,
} from "../../types/optimization.types"
import config from "../../keyboardLayouts/config.json"

export const optimizationProgressInitialState: OptimizationProgress = {
  current_generation: 0,
  total_generations: config.number_of_generations,
}

export const optimizationInitialState: OptimizationState = {
  socket: undefined,
  optimizationStatus: ProcessStatus.process_idle,
  progress: optimizationProgressInitialState,
  optimizedEditingKeyboard: undefined,
  analysis: undefined,
}

export const punctuationPlacements: PunctuationPlacementDictionary = {
  0: [11, 12, 58, 59, 34, 35, 81, 82, 43, 44, 45, 90, 91, 92, 23, 24, 70, 71],
  1: [11, 12, 58, 59, 13, 14, 15, 60, 61, 62, 36, 83, 35, 82, 23, 24, 70, 71],
  2: [11, 12, 58, 59, 13, 14, 60, 61, 25, 72, 36, 37, 83, 84, 23, 24, 70, 71],
  3: [11, 12, 58, 59, 13, 60, 36, 83, 43, 44, 45, 90, 91, 92, 23, 24, 70, 71],
  4: [11, 12, 58, 59, 13, 60, 36, 83, 35, 82, 44, 45, 91, 92, 23, 24, 70, 71],
}

export const initialOptimizationConfig: OptimizationConfig = {
  number_of_generations: 1,
  effort_parameters: {
    finger_distance_weight: {
      weight: 1,
      finger_weights: {
        index: 0.6,
        middle: 0.8,
        ring: 0.9,
        little: 1,
      },
    },
    load_distribution_weight: 0,
    modifier_overhead_weight: 3,
    hand_alternation_weight: 0,
    consecutive_finger_usage_weight: 0,
    same_hand_finger_steps_weight: 0,
    hit_direction_weight: 0.1,
    hand_weights: {
      left: 1,
      right: 1,
    },
  },
  punctuation_placement: punctuationPlacements[PunctuationPlacement.qwerty],
  characters_set: [],
}

export const initialAnalysisSpecificEffort: AnalysisSpecific = {
  total_effort: -1,
  left_hand_effort: 0,
  right_hand_effort: 0,
  finger_distance_effort: 0,
  modifier_overhead_effort: 0,
  hand_alternation_effort: 0,
  consecutive_finger_usage_effort: 0,
  same_hand_finger_steps_effort: 0,
  hit_direction_effort: 0,
}

export const initialAnalysisEffort: Analysis = {
  your_layout: initialAnalysisSpecificEffort,
  qwerty: initialAnalysisSpecificEffort,
}
