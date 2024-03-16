import React, { createContext, useContext, useState, ReactNode } from "react"
import { MetricsContextValue, MetricsContextProps } from "../../types/typer.types/Metrics.types"
import { wordsLetterStatusesType } from "../../types/typer.types/letterStatuses.types"

const MetricsContext = createContext<MetricsContextValue | undefined>(undefined)

export const MetricsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialMetrics: MetricsContextProps = {
    keyPressHistory: [],
    letterStatuses: [],
    keyPressTimestamps: [],
    correctPressTimestamps: [],
    keyPressCount: 0,
    correctPressCount: 0,
    incorrectPressCount: 0,
  }

  const [metrics, setMetrics] = useState<MetricsContextProps>(initialMetrics)

  const handleResetMetrics = () => {
    setMetrics(initialMetrics)
  }

  const recordKeyPressAllMetrics = (isCorrect: boolean, key: string, isTypableKey: boolean) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      keyPressHistory: [...prevMetrics.keyPressHistory, key],
      keyPressTimestamps: [...prevMetrics.keyPressTimestamps, Date.now()],
      correctPressTimestamps: isCorrect
        ? [...prevMetrics.correctPressTimestamps, Date.now()]
        : prevMetrics.correctPressTimestamps,
      keyPressCount: prevMetrics.keyPressCount + 1,
      correctPressCount:
        isCorrect && isTypableKey
          ? prevMetrics.correctPressCount + 1
          : prevMetrics.correctPressCount,
      incorrectPressCount:
        !isCorrect && isTypableKey
          ? prevMetrics.incorrectPressCount + 1
          : prevMetrics.incorrectPressCount,
    }))
  }

  const handleKeyPressHistory = (key: string) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      keyPressHistory: [...prevMetrics.keyPressHistory, key],
    }))
  }

  const handleKeyPressTimestamps = () => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      keyPressTimestamps: [...prevMetrics.keyPressTimestamps, Date.now()],
    }))
  }

  const handleCorrectPressTimestamps = () => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      correctPressTimestamps: [...prevMetrics.correctPressTimestamps, Date.now()],
    }))
  }

  const handleKeyPressCount = () => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      keyPressCount: prevMetrics.keyPressCount + 1,
    }))
  }

  const handleCorrectPressCount = () => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      correctPressCount: prevMetrics.correctPressCount + 1,
    }))
  }

  const handleIncorrectPressCount = () => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      incorrectPressCount: prevMetrics.incorrectPressCount + 1,
    }))
  }

  const handleSetLetterStatuses = (letterStatuses: wordsLetterStatusesType) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      letterStatuses: letterStatuses,
    }))
  }

  const handleMetrics = {
    recordKeyPressAllMetrics,
    handleKeyPressHistory,
    handleKeyPressTimestamps,
    handleCorrectPressTimestamps,
    handleKeyPressCount,
    handleCorrectPressCount,
    handleIncorrectPressCount,
    handleSetLetterStatuses,
    handleResetMetrics,
  }

  return (
    <MetricsContext.Provider value={{ metrics, handleMetrics }}>{children}</MetricsContext.Provider>
  )
}

export const useMetrics = (): MetricsContextValue => {
  const context = useContext(MetricsContext)
  if (!context) {
    throw new Error("useMetrics must be used within a MetricsProvider")
  }
  return context
}
