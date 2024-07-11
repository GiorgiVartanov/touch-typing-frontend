import Typer from "../Typer/Typer"
import { useState } from "react"
import Results from "./Results/Results"
import { MetricsProvider } from "../../store/context/MetricsContext"
import { KeyboardLanguageType } from "../../types/typer.types/typingSettings.types"

import "./styles.scss"
import { MetricsContextProps } from "../../types/typer.types/Metrics.types"

interface Props {
  text: string
  textLanguage: KeyboardLanguageType
  wordSeparator?: string
  handleTextFinish?: () => void
  handleSetMetrics?: (metrics: MetricsContextProps) => void
  displayResultsAfterFinish?: boolean // will display results after finish even if handleTextFinish function was provided
  showKeyboard?: boolean
  className?: string
  showGoToNextLevel?: boolean
  nextLevelURL?: string
  isLastAssessment?: boolean
  accuracyToComplete?: number
}

const TypingAreaDisplay = ({
  text,
  wordSeparator,
  textLanguage,
  handleTextFinish,
  handleSetMetrics,
  displayResultsAfterFinish,
  showKeyboard = true,
  className,
  showGoToNextLevel = false,
  nextLevelURL = "/",
  isLastAssessment = false,
  accuracyToComplete = 0,
}: Props) => {
  const [displayResults, setDisplayResults] = useState(false)

  const handleOnTextFinish = () => {
    if (displayResultsAfterFinish && handleTextFinish) {
      handleTextFinish()
      setDisplayResults(true)
    } else if (handleTextFinish) handleTextFinish()
    else setDisplayResults(true)
  }

  const handleRestart = () => setDisplayResults(false)

  return (
    // <MetricsProvider>
    <div className="TypingArea">
      {displayResults ? (
        <div className="typer">
          <Results
            handleRestart={handleRestart}
            showGoToNextLevel={showGoToNextLevel}
            nextLevelURL={nextLevelURL}
            isLastAssessment={isLastAssessment}
            accuracyToComplete={accuracyToComplete}
          />
        </div>
      ) : (
        <Typer
          text={text}
          textLanguage={textLanguage}
          wordSeparator={wordSeparator}
          handleTextFinish={handleOnTextFinish}
          handleSetMetrics={handleSetMetrics}
          showKeyboard={showKeyboard}
          className={className}
        />
      )}
    </div>
    //</MetricsProvider>
  )
}

const TypingArea = ({
  text,
  wordSeparator,
  textLanguage,
  handleTextFinish,
  handleSetMetrics,
  displayResultsAfterFinish,
  showKeyboard = true,
  className,
  showGoToNextLevel = false,
  nextLevelURL = "/",
  accuracyToComplete = 0,
  isLastAssessment = false,
}: Props) => {
  return (
    <MetricsProvider>
      <TypingAreaDisplay
        text={text}
        textLanguage={textLanguage}
        wordSeparator={wordSeparator}
        displayResultsAfterFinish={displayResultsAfterFinish}
        handleTextFinish={handleTextFinish}
        handleSetMetrics={handleSetMetrics}
        showKeyboard={showKeyboard}
        className={className}
        showGoToNextLevel={showGoToNextLevel}
        nextLevelURL={nextLevelURL}
        accuracyToComplete={accuracyToComplete}
      />
    </MetricsProvider>
  )
}

export default TypingArea
