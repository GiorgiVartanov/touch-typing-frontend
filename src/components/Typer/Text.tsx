/// <reference types="vite-plugin-svgr/client" />
// fixed issue with importing svg file as a component

import "./styles.scss"

import { useState, useEffect, useRef } from "react"

import calculateWPM from "../../util/calculateWPM"

import ResetIcon from "../../assets/icons/arrow-rotate-left.svg?react"
// it has "?react" at the end, so it will be imported as a Component

import Word from "./Word"
import ActiveWord from "./ActiveWord"
import TextSettings from "./TextSettings"

export type FontType = "sans" | "serif"

interface Props {
  text: string
}

const Text = ({ text }: Props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctLetters, setCorrectLetters] = useState<(0 | 1 | 2)[][]>([])
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number | null>(null)

  const savedSelectedFont = localStorage.getItem("selected-font")

  const [selectedFont, setSelectedFont] = useState<FontType>(
    (savedSelectedFont as FontType) || "sans"
  )

  const timerRef = useRef<number | null>(null)

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

  // calculates user's word accuracy after each typed word
  const calculateAccuracy = () => {
    const percentageOfCorrectWords =
      (correctLetters.filter((wordCorrectLetters) =>
        wordCorrectLetters.every((letter) => letter === 2)
      ).length /
        correctLetters.length) *
      100

    const accuracy = percentageOfCorrectWords || 0

    return `${accuracy.toFixed(2)}%`
  }

  const refreshText = () => {
    setCorrectLetters([])
    setCurrentWordIndex(0)
    setIsTyping(false)
    setStartTime(null)
  }

  const startTimer = () => {
    if (startTime === null) {
      setStartTime(Date.now())
    }
  }

  const handleKeyPress = () => {
    // used tp start counting time after user presses a key first time
    if (!isTyping) {
      setIsTyping(true)
      startTimer()
    }
  }

  const selectFont = (font: FontType) => {
    localStorage.setItem("selected-font", font)
    setSelectedFont(font)
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [isTyping])

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])

  const hasFinished = currentWordIndex === text.split(" ").length

  const endTime = Date.now()
  const elapsedTime = startTime !== null ? (endTime - startTime) / 1000 : 0

  return (
    <div className="text-component">
      <div className="text-panel">
        <div className="word-count">{calculateAccuracy()}</div>
        <div className="time">{hasFinished ? `${elapsedTime.toFixed(2)} seconds` : ""}</div>
        <div className="time">
          {hasFinished ? `${calculateWPM(elapsedTime, correctLetters).toFixed(2)} WPM` : ""}
        </div>
        <div className="options-buttons">
          <button
            onClick={refreshText}
            className="reset-button"
          >
            <ResetIcon
              fill="white"
              width={18}
              height={18}
            />
          </button>
          <TextSettings
            selectedFont={selectedFont}
            selectFont={selectFont}
            fonts={["sans", "serif"]}
          />
        </div>
      </div>
      <div className={`text font-${selectedFont}`}>
        {text.split(" ").map((word, index) => {
          if (index === currentWordIndex) {
            return (
              <ActiveWord
                key={index}
                word={word}
                goToNextWord={goToNextWord}
                isLastWord={index === text.split(" ").length - 1}
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
    </div>
  )
}
export default Text
