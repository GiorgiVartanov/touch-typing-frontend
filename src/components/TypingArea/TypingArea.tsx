import Typer from "../Typer/Typer"
import { useState } from "react"
import Results from "./Results/Results"
import { MetricsProvider } from "../../store/context/MetricsContext"

interface Props {
  text: string
  wordSeparator?: string
  handleTextFinish?: () => void
}

const TypingAreaDisplay = ({ text, wordSeparator }: Props) => {
  const [displayResults, setDisplayResults] = useState(false)
  const handleTextFinish = () => {
    setDisplayResults(true)
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
            wordSeparator={wordSeparator}
            handleTextFinish={handleTextFinish}
          />
        )}
      </div>
    </MetricsProvider>
  )
}

const TypingArea = ({ text, wordSeparator, handleTextFinish }: Props) => {
  return (
    <MetricsProvider>
      <TypingAreaDisplay
        text={text}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
      />
    </MetricsProvider>
  )
}

export default TypingArea
