/// <reference types="vite-plugin-svgr/client" />
// fixed issue with importing svg file as a component

import { useState, useEffect, useRef } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

// import ResetIcon from "../../assets/icons/arrow-rotate-left.svg?react"
// it has "?react" at the end, so it will be imported as a Component

import Word from "./Word"
import ActiveWord from "./ActiveWord"

const textAlignValues = { left: "start", center: "center", right: "end" }

interface Props {
  text: string[]
  wordSeparator?: string // string that will be printed between every word
  finishHandler?: (lettersStatuses: (0 | 1 | 2)[][], startTime: Date | null) => void
}

const Text = ({ text, wordSeparator = "", finishHandler = undefined }: Props) => {
  const { font, fontSize, lineHeight, letterSpacing, alignText } = useTypingSettingsStore()
  const startTime = useRef<Date | null>(null)

  const textLength = text.length

  // const containerHeight = `${amountOfShownLines * lineSpacing}rem`

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [lettersStatuses, setLettersStatuses] = useState<(0 | 1 | 2)[][]>([])

  // goes to the next word
  const goToNextWord = (wordLetterStatuses: (0 | 1 | 2)[]) => {
    // 0 - letter was not typed yet
    // 1 - letter was typed incorrectly
    // 2 - letter was typed correctly

    setCurrentWordIndex((prevState) => prevState + 1)
    setLettersStatuses((prevState) => {
      if (prevState) {
        return [...prevState, wordLetterStatuses]
      } else {
        return [wordLetterStatuses]
      }
    })

    if (currentWordIndex + 1 === text.length && finishHandler)
      finishHandler([...lettersStatuses, wordLetterStatuses], startTime.current)
  }

  useEffect(() => {
    setCurrentWordIndex(0)
    setLettersStatuses([])
  }, [text])

  return (
    <div
      autoFocus={true}
      // applies text settings
      style={{
        fontSize: `${fontSize === "Auto" ? "1.25rem" : `${fontSize}px`}`,
        lineHeight: `${lineHeight === "Auto" ? "1.25rem" : `${lineHeight}px`}`,
        letterSpacing: `${letterSpacing}px`,
        justifyContent: textAlignValues[alignText],
      }}
      className={`text font-${font}`}
    >
      {text.map((word, index) => {
        if (index === currentWordIndex) {
          return (
            <ActiveWord
              key={index}
              word={word}
              goToNextWord={goToNextWord}
              isLastWord={index === textLength - 1}
              wordSeparator={wordSeparator}
              startTime={startTime}
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
