/// <reference types="vite-plugin-svgr/client" />

import { useState, useEffect } from "react"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

import Word from "../Typer/Word"
import ActiveWord from "../Typer/ActiveWord"

const textAlignValues = { left: "start", center: "center", right: "end" }

interface Props {
  words: string[]
  wordSeparator?: string
}

const Text = ({ words, wordSeparator = "" }: Props) => {
  const [text, setText] = useState(words)
  const { font, fontSize, lineHeight, letterSpacing, alignText } = useTypingSettingsStore()

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctLetters, setCorrectLetters] = useState<(0 | 1 | 2)[][]>([])

  const originalTextLength = words.length

  const goToNextWord = (correctLetters: (0 | 1 | 2)[]) => {
    // 0 - letter was not typed yet
    // 1 - letter was typed incorrectly
    // 2 - letter was typed correctly

    setCurrentWordIndex((prevState) => prevState + 1)
    setCorrectLetters((prevState) => {
      if (prevState) {
        return [...prevState, correctLetters]
      } else {
        return [correctLetters]
      }
    })

    if (correctLetters.includes(1)) {
      setText((prev) => [...prev, text[currentWordIndex]])
    }
  }

  useEffect(() => {
    setCorrectLetters((prev) => [...prev])
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
              isLastWord={index === text.length - 1}
              wordSeparator={wordSeparator}
              className={index >= originalTextLength ? "penalty-word" : ""}
            />
          )
        } else {
          return (
            <Word
              key={index}
              word={word}
              correctLetters={correctLetters[index]}
              wordSeparator={wordSeparator}
              className={index >= originalTextLength ? "penalty-word" : ""}
            />
          )
        }
      })}
    </div>
  )
}
export default Text
