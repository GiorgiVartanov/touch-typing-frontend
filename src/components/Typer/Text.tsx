/// <reference types="vite-plugin-svgr/client" />
// fixed issue with importing svg file as a component

import "./styles.scss"

import { useState } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

// import ResetIcon from "../../assets/icons/arrow-rotate-left.svg?react"
// it has "?react" at the end, so it will be imported as a Component

import Word from "./Word"
import ActiveWord from "./ActiveWord"

interface Props {
  text: string[]
  wordSeparator?: string // space
}

const Text = ({ text, wordSeparator = "" }: Props) => {
  const { selectedFont, fontSize, lineHeight, letterSpacing, alignText } = useTypingSettingsStore()

  // const containerHeight = `${amountOfShownLines * lineSpacing}rem`

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctLetters, setCorrectLetters] = useState<(0 | 1 | 2)[][]>([])

  // goes to the next word
  const goToNextWord = (correctLetters: (0 | 1 | 2)[]) => {
    // 0 - letter was not typed yet
    // 1 - letter was typed incorrectly
    // 2- letter was typed correctly

    setCurrentWordIndex((prevState) => prevState + 1)
    setCorrectLetters((prevState) => {
      if (prevState) {
        return [...prevState, correctLetters]
      } else {
        return [correctLetters]
      }
    })
  }

  return (
    <div
      autoFocus={true}
      // applies text settings
      style={{
        fontSize: `${fontSize === "Auto" ? "1.25rem" : `${fontSize}px`}`,
        lineHeight: `${lineHeight === "Auto" ? "1.25rem" : `${lineHeight}px`}`,
        letterSpacing: `${letterSpacing}px`,
        justifyContent: (() => {
          switch (alignText) {
            case "left":
              return "start"
            case "center":
              return "center"
            case "right":
              return "end"
            default:
              return "start"
          }
        })() as "start" | "center" | "end",
      }}
      className={`text font-${selectedFont}`}
    >
      {text.map((word, index) => {
        if (index === currentWordIndex) {
          return (
            <ActiveWord
              key={index}
              word={word}
              goToNextWord={goToNextWord}
              isLastWord={index === text.length - 1}
              wordSeparator={wordSeparator}
            />
          )
        } else {
          return (
            <Word
              key={index}
              word={word}
              correctLetters={correctLetters[index]}
              wordSeparator={wordSeparator}
            />
          )
        }
      })}
    </div>
  )
}
export default Text
