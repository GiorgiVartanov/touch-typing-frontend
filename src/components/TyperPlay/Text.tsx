/// <reference types="vite-plugin-svgr/client" />
// fixed issue with importing svg file as a component

import { useState, useEffect, useRef } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

// import ResetIcon from "../../assets/icons/arrow-rotate-left.svg?react"
// it has "?react" at the end, so it will be imported as a Component

import Word from "../Typer/Word"
import ActiveWord from "../Typer/ActiveWord"
import { wordLetterStatusesType } from "../../types/typer.types/letterStatuses.types"
import { useMetrics } from "../../store/context/MetricsContext"
import calculateWPM from "../../util/TypingStats/calculateWPM"

interface Props {
  text: string[]
  wordSeparator?: string // string that will be printed between every word
  handleTextFinish: (user_wpm: number) => void
  ModifyMatch: (currentWordIndex: number) => void
  removeTextComponent: () => void
}

const Text = ({
  text,
  wordSeparator = "",
  handleTextFinish,
  ModifyMatch,
  removeTextComponent,
}: Props) => {
  const { font, fontSize } = useTypingSettingsStore()
  const { metrics, handleMetrics } = useMetrics()

  const textLength = text.length

  // const containerHeight = `${amountOfShownLines * lineSpacing}rem`

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [lettersStatuses, setLettersStatuses] = useState<(0 | 1 | 2)[][]>([])
  const accuracy = useRef<number>(0)
  const totalSymbols = useRef<number>(text.join("").length)

  // goes to the next word
  const handleFinishWord = async (
    wordLetterStatuses: wordLetterStatusesType,
    isLastWord: boolean
  ) => {
    setCurrentWordIndex((prevState) => prevState + 1)
    setLettersStatuses((prevState) => {
      if (prevState) {
        return [...prevState, wordLetterStatuses]
      } else {
        return [wordLetterStatuses]
      }
    })

    accuracy.current += wordLetterStatuses.reduce(
      (prev: number, curr) => prev + Number(curr === 2),
      0
    )
    await ModifyMatch((accuracy.current / totalSymbols.current) * 100)

    if (isLastWord) {
      handleMetrics.handleSetLetterStatuses([...lettersStatuses, wordLetterStatuses])
      const time =
        metrics.keyPressTimestamps[metrics.keyPressCount - 1] - metrics.keyPressTimestamps[0]
      handleTextFinish(calculateWPM(time / 1000, lettersStatuses))
      removeTextComponent()
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
        return "0.75rem"
      case "medium":
        return "1rem"
      case "large":
        return "1.25rem"
      case "extra large":
        return "1.5rem"
      default:
        return "1.5rem"
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
    <>
      {currentWordIndex === text.length ? (
        <h1>
          Waiting for other players to finish...<br></br>
        </h1>
      ) : (
        <></>
      )}
      <div
        autoFocus={true}
        style={{
          fontSize: calculateFontSize(),
          lineHeight: calculateLineHeight(),
        }}
        className={`text font-${font}`}
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
    </>
  )
}
export default Text
