import { wordsLetterStatusesType } from "./letterStatuses.types"

export interface MetricsContextProps {
  keyPressHistory: string[]
  keyPressTimestamps: number[]
  correctPressTimestamps: number[]
  keyPressCount: number
  correctPressCount: number
  incorrectPressCount: number
  letterStatuses: wordsLetterStatusesType
}

export interface HandleMetrics {
  recordKeyPressAllMetrics: (isCorrect: boolean, key: string, isInputTypable: boolean) => void
  handleKeyPressHistory: (key: string) => void
  handleKeyPressTimestamps: () => void
  handleCorrectPressTimestamps: () => void
  handleKeyPressCount: () => void
  handleCorrectPressCount: () => void
  handleIncorrectPressCount: () => void
  handleSetLetterStatuses: (letterStatuses: wordsLetterStatusesType) => void
  handleResetMetrics: () => void
}

export type MetricsContextValue = {
  metrics: MetricsContextProps
  handleMetrics: HandleMetrics
}
