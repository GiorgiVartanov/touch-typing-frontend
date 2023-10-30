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
  // correctLetterColor?: string
  // correctLetterBackground?: string
  // incorrectLetterColor?: string
  // incorrectLetterBackground?: string
}

const Text = ({ text }: Props) => {
  const { selectedFont, fontSize, amountOfShownLines, lineSpacing, letterSpacing } =
    useTypingSettingsStore()

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

  console.log(selectedFont, fontSize, amountOfShownLines, lineSpacing, letterSpacing)

  return (
    <div
      autoFocus={true}
      style={
        {
          // fontSize: `${fontSize}rem`,
          // lineHeight: `${lineSpacing}rem`,
          // gap: `${lineSpacing}rem`,
          // margin: `${lineSpacing}rem 0 0 0`,
          // maxHeight: containerHeight,
        }
      }
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
            />
          )
        } else {
          return (
            <Word
              key={index}
              word={word}
              correctLetters={correctLetters[index]}
            />
          )
        }
      })}
    </div>
  )
}
export default Text
