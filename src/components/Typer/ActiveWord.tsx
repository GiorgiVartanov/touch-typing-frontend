import { useEffect, useState, useRef } from "react"

import Letter from "./Letter"
import { LetterStatus, wordLetterStatusesType } from "../../types/typer.types/letterStatuses.types"
import { useMetrics } from "../../store/context/MetricsContext"
import { KeyInterface } from "../../types/keyboard.types"

const allowedKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "=",
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "[",
  "]",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  ";",
  "'",
  "\\",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
  ",",
  ".",
  "/",
  "ქ",
  "წ",
  "ე",
  "რ",
  "ტ",
  "ყ",
  "უ",
  "ი",
  "ო",
  "პ",
  "ა",
  "ს",
  "დ",
  "ფ",
  "გ",
  "ჰ",
  "ჯ",
  "კ",
  "ლ",
  "~",
  "ზ",
  "ხ",
  "ც",
  "ვ",
  "ბ",
  "ნ",
  "მ",
  "ჭ",
  "შ",
  "ღ",
  "თ",
  "ჩ",
  "ძ",
  "ჟ",
  "Enter",
  "Backspace",
  " ",
  "",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
]

const typableAllowedKeys = allowedKeys.filter((key) => key !== "Enter" && key !== "Backspace")

interface Props {
  word: string
  handleFinishWord: (lettersStatuses: wordLetterStatusesType, isLastWord: boolean) => void
  isLastWord: boolean
  wordSeparator: string
  keyboard: KeyInterface[]
  style?: React.CSSProperties
  className?: string
}

const ActiveWord = ({
  word,
  handleFinishWord,
  isLastWord,
  wordSeparator,
  keyboard,
  style,
  className,
}: Props) => {
  const { handleMetrics } = useMetrics()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)

  const [lettersStatuses, setLettersStatuses] = useState<wordLetterStatusesType>(
    Array.from({ length: word.length }, () => LetterStatus.Inactive)
  )

  useEffect(() => {
    if (
      isLastWord &&
      currentLetterIndex === word.length &&
      lettersStatuses[word.length - 1] === LetterStatus.Correct // for test to finish last typed char has to be correct
    ) {
      handleFinishWord(lettersStatuses, true)
    }
  })

  const handleKeyPress = (e: KeyboardEvent) => {
    // const pressedKey = e.key

    const pressedKeyCode = e.code

    const pressedKey = keyboard.find((key) => key.code === pressedKeyCode)

    if (!pressedKey) return

    let pressedKeyValue = ""

    if (pressedKey.type === "Modifier") {
      if (typeof pressedKey.value === "object") {
        pressedKeyValue = pressedKey.value[0]
      } else {
        pressedKeyValue = pressedKey.value
      }
    } else {
      if (
        (e.shiftKey && !e.getModifierState("CapsLock")) ||
        (!e.shiftKey && e.getModifierState("CapsLock"))
      ) {
        pressedKeyValue = pressedKey.value[1]
      } else {
        pressedKeyValue = pressedKey.value[0]
      }
    }

    let isInputCharCorrect = pressedKeyValue === word[currentLetterIndex]
    const isInputTypable = typableAllowedKeys.includes(pressedKeyValue)

    // ignores certain keys that should not trigger any action
    if (!allowedKeys.includes(pressedKeyValue)) return

    // if user presses on space and they have typed  the last character, they will be moved to the next word
    if (pressedKeyValue === " " && currentLetterIndex > word.length - 1) {
      if (isLastWord) {
        handleFinishWord(lettersStatuses, true) // you can end test by pressing space if you are at the end
      } else {
        handleFinishWord(lettersStatuses, false)
        isInputCharCorrect = true // space is correct char
      }
    }

    // collect needed metrics
    handleMetrics.recordKeyPressAllMetrics(isInputCharCorrect, pressedKeyValue, isInputTypable)

    // if user is at the end of a word they can press space to go the the next word, or on backspace to go back
    if (currentLetterIndex === word.length && ![" ", "Backspace"].includes(pressedKeyValue)) return

    // default action of pressing on space key is to scroll down
    if (e.key === " ") {
      e.preventDefault()
    }

    if (e.key === "Backspace" && e.ctrlKey) {
      e.preventDefault()
      // Remove the whole word by resetting the lettersStatuses and currentLetterIndex
      setLettersStatuses(Array.from({ length: word.length }, () => 0))
      setCurrentLetterIndex(0)
      return
    }

    // if the user presses Backspace and they are not on the first character of a word, move back one letter
    if (pressedKeyValue === "Backspace" && currentLetterIndex > 0) {
      setCurrentLetterIndex((prevState) => prevState - 1)
      // marks erased character as letter that was not typed (0)
      setLettersStatuses((prevState) => {
        const savedPrevState = prevState
        savedPrevState[currentLetterIndex - 1] = 0
        return savedPrevState
      })
      return
    }

    if (pressedKeyValue === "Backspace") return

    setLettersStatuses((prevState) => {
      const savedPrevState = prevState
      savedPrevState[currentLetterIndex] = isInputCharCorrect
        ? LetterStatus.Correct
        : LetterStatus.Incorrect
      return savedPrevState
    })

    // moving to the next character
    setCurrentLetterIndex((prevState) => prevState + 1)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [currentLetterIndex])

  useEffect(() => {
    if (!inputRef?.current) return

    // focuses on the input, so mobile user will be able to type
    inputRef.current.focus()
  }, [])

  return (
    <div
      style={style}
      className={`word ${className}`}
    >
      {[...word.split(""), isLastWord ? "" : "\u00a0" + wordSeparator + "\u00a0"].map(
        (letter, index) => (
          <Letter
            key={index}
            letter={letter}
            isCurrentLetter={index === currentLetterIndex}
            isCorrect={lettersStatuses[index]}
          />
        )
      )}
    </div>
  )
}
export default ActiveWord
