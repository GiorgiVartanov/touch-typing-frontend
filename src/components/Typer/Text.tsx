/// <reference types="vite-plugin-svgr/client" />
// fixed issue with importing svg file as a component

import { useState, useEffect } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

import Word from "./Word"
import ActiveWord from "./ActiveWord"
import {
  wordsLetterStatusesType,
  wordLetterStatusesType,
} from "../../types/typer.types/letterStatuses.types"
import { useMetrics } from "../../store/context/MetricsContext"

interface Props {
  text: string[]
  wordSeparator?: string // string that will be printed between every word
  handleTextFinish: () => void
  className?: string
}

const Text = ({ text, wordSeparator = "", handleTextFinish, className }: Props) => {
  const { font, fontSize } = useTypingSettingsStore()
  const { handleMetrics } = useMetrics()

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
      handleTextFinish()
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
