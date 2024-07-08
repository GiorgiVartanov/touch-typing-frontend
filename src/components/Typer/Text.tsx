import { useState, useEffect } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"
import { KeyInterface } from "../../types/keyboard.types"

import Word from "./Word"
import ActiveWord from "./ActiveWord"
import {
  wordsLetterStatusesType,
  wordLetterStatusesType,
} from "../../types/typer.types/letterStatuses.types"
import { useMetrics } from "../../store/context/MetricsContext"
import { MetricsContextProps } from "../../types/typer.types/Metrics.types"

interface Props {
  text: string[]
  wordSeparator?: string // string that will be printed between every word
  handleTextFinish: (metric?: MetricsContextProps) => void
  keyboard: KeyInterface[]
  className?: string
}

const Text = ({ text, wordSeparator = "", handleTextFinish, keyboard, className }: Props) => {
  const { font, fontSize } = useTypingSettingsStore()
  const { metrics, handleMetrics } = useMetrics()

  const textLength = text.length

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [lettersStatuses, setLettersStatuses] = useState<wordsLetterStatusesType>([])

  // goes to the next word
  const handleFinishWord = (wordLetterStatuses: wordLetterStatusesType, isLastWord: boolean) => {
    setCurrentWordIndex((prevState) => prevState + 1)
    setLettersStatuses((prevState) => {
      if (prevState) {
        return [...prevState, wordLetterStatuses]
      } else {
        return [wordLetterStatuses]
      }
    })

    if (isLastWord) {
      handleMetrics.handleSetLetterStatuses([...lettersStatuses, wordLetterStatuses])
      console.log(metrics)
      const copy_metrics = structuredClone(metrics)
      handleTextFinish(copy_metrics)
    }
  }

  useEffect(() => {
    setCurrentWordIndex(0)
    setLettersStatuses([])
    handleMetrics.handleResetMetrics()
  }, [text])

  const calculateFontSize = () => {
    switch (fontSize) {
      case "small":
        return "1rem"
      case "medium":
        return "1.25rem"
      case "large":
        return "1.5rem"
      case "extra large":
        return "1.75rem"
      default:
        return "1.25rem"
    }
  }

  const calculateLineHeight = () => {
    switch (fontSize) {
      case "small":
        return "1.2"
      case "medium":
        return "1.25"
      case "large":
        return "1.2"
      case "extra large":
        return "1.2"
      default:
        return "1.3"
    }
  }

  return (
    <div
      autoFocus={true}
      // applies text settings
      style={{
        fontSize: calculateFontSize(),
        lineHeight: calculateLineHeight(),
      }}
      className={`text font-${font} ${className}`}
    >
      {text.map((word, index) => {
        if (index === currentWordIndex) {
          return (
            <ActiveWord
              key={index}
              word={word}
              handleFinishWord={handleFinishWord}
              isLastWord={index === textLength - 1}
              wordSeparator={wordSeparator}
              keyboard={keyboard}
            />
          )
        } else {
          return (
            <Word
              key={index}
              word={word}
              lettersStatuses={lettersStatuses[index]}
              isLastWord={index === textLength - 1}
              wordSeparator={wordSeparator}
            />
          )
        }
      })}
    </div>
  )
}
export default Text
