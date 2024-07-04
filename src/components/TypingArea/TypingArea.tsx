import Typer from "../Typer/Typer"
import { useState } from "react"
import Results from "./Results/Results"
import { MetricsProvider } from "../../store/context/MetricsContext"
import { KeyboardLanguageType } from "../../types/typer.types/typingSettings.types"

import "./styles.scss"

interface Props {
  text: string
  textLanguage: KeyboardLanguageType
  wordSeparator?: string
  handleTextFinish?: () => void
  displayResultsAfterFinish?: boolean // will display results after finish even if handleTextFinish function was provided
  showKeyboard?: boolean
  className?: string
}

const TypingAreaDisplay = ({
  text,
  wordSeparator,
  textLanguage,
  handleTextFinish,
  displayResultsAfterFinish,
  showKeyboard = true,
  className,
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
    <MetricsProvider>
      <div className="TypingArea">
        {displayResults ? (
          <div className="typer">
            <Results handleRestart={handleRestart} />
          </div>
        ) : (
          <Typer
            text={text}
            textLanguage={textLanguage}
            wordSeparator={wordSeparator}
            handleTextFinish={handleOnTextFinish}
            showKeyboard={showKeyboard}
            className={className}
          />
        )}
      </div>
    </MetricsProvider>
  )
}

const TypingArea = ({
  text,
  wordSeparator,
  textLanguage,
  handleTextFinish,
  displayResultsAfterFinish,
  showKeyboard = true,
  className,
}: Props) => {
  return (
    <MetricsProvider>
      <TypingAreaDisplay
        text={text}
        textLanguage={textLanguage}
        wordSeparator={wordSeparator}
        displayResultsAfterFinish={displayResultsAfterFinish}
        handleTextFinish={handleTextFinish}
        showKeyboard={showKeyboard}
        className={className}
      />
    </MetricsProvider>
  )
}

export default TypingArea
