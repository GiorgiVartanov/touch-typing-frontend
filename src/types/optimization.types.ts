import { Socket } from "socket.io-client"
import { KeyInterface } from "./keyboard.types"

export interface OptimizationProgress {
  current_generation: number
  total_generations: number
}

export interface OptimizationState {
  socket: Socket | undefined
  progress: OptimizationProgress
  optimizationStatus: boolean
  optimizedEditingKeyboard: KeyInterface[] | undefined
}

export interface OptimizationActions {
  setProgress: (data_progress: OptimizationProgress) => void
  setSocket: (data_socket: Socket) => void
  setOptimizationStatus: (data_optimizationStatus: boolean) => void
  setOptimizedEditingKeyboard: (data_optimizedEditingKeyboard: KeyInterface[] | undefined) => void
  startOptimization: () => void
}
