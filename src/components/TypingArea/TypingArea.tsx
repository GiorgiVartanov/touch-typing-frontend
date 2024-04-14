import Typer from "../Typer/Typer"
import { useState } from "react"
import Results from "./Results/Results"
import { MetricsProvider } from "../../store/context/MetricsContext"

import "./styles.scss"

interface Props {
  text: string
  textLanguage: "En" | "Geo"
  wordSeparator?: string
  handleTextFinish?: () => void
  showKeyboard?: boolean
  className?: string
}

const TypingAreaDisplay = ({
  text,
  wordSeparator,
  textLanguage,
  handleTextFinish,
  showKeyboard = true,
  className,
}: Props) => {
  const [displayResults, setDisplayResults] = useState(false)
  const handleOnTextFinish = () => {
    console.log(handleTextFinish)

    if (handleTextFinish) handleTextFinish()
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
  showKeyboard = true,
  className,
}: Props) => {
  return (
    <MetricsProvider>
      <TypingAreaDisplay
        text={text}
        textLanguage={textLanguage}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
        showKeyboard={showKeyboard}
        className={className}
      />
    </MetricsProvider>
  )
}

export default TypingArea
