import { Socket } from "socket.io-client"
import { KeyInterface } from "./keyboard.types"

export interface OptimizationProgress {
  current_generation: number
  total_generations: number
}

export interface OptimizationState {
  socket: Socket | undefined
  progress: OptimizationProgress
  optimizationStatus: ProcessStatus
  optimizedEditingKeyboard: KeyInterface[] | undefined
}

export enum ProcessStatus {
  process_idle = 0,
  initialization_started = 1,
  initialization_finished = 2,
}

export interface OptimizationActions {
  setProgress: (data_progress: OptimizationProgress) => void
  setSocket: (data_socket: Socket) => void
  setOptimizationStatus: (data_optimizationStatus: ProcessStatus) => void
  setOptimizedEditingKeyboard: (data_optimizedEditingKeyboard: KeyInterface[] | undefined) => void
  startOptimization: (optimizationConfig: OptimizationConfig) => void
}

export interface OptimizationConfig {
  number_of_generations: number
  effort_parameters: EffortParameters
  punctuation_placement: number[]
}

export interface EffortParameters {
  finger_distance_weight: FingerDistanceWeight
  load_distribution_weight: number
  modifier_overhead_weight: number
  hand_alternation_weight: number
  consecutive_finger_usage_weight: number
  same_hand_finger_steps_weight: number
  hit_direction_weight: number
  hand_weights: HandWeights
}

export interface HandWeights {
  left: number
  right: number
}

export interface FingerWeights {
  index: number
  middle: number
  ring: number
  little: number
}

export interface FingerDistanceWeight {
  weight: number
  finger_weights: FingerWeights
}

export interface Character {
  character: string
  button_id: number | null
}
