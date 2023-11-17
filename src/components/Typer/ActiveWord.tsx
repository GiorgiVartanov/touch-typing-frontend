import { useEffect, useState, useRef, MutableRefObject } from "react"

import Letter from "./Letter"

const usedKeys = [
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
]

interface Props {
  word: string
  goToNextWord: (lettersStatuses: (0 | 1 | 2)[]) => void
  isLastWord: boolean
  wordSeparator: string
  style?: React.CSSProperties
  className?: string
  startTime?: MutableRefObject<Date | null>
}

const ActiveWord = ({
  word,
  goToNextWord,
  isLastWord,
  wordSeparator,
  style,
  className,
  startTime,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
  const [lettersStatuses, setLettersStatuses] = useState<(0 | 1 | 2)[]>(
    Array.from({ length: word.length }, () => 0)
  )

  const handleKeyPress = (e: KeyboardEvent) => {
    if (startTime?.current === null) startTime.current = new Date()

    const pressedKey = e.key

    // ignores certain keys that should not trigger any action
    if (!usedKeys.includes(pressedKey)) {
      return
    }

    // if user is at the end of a word they can press on enter or space to go the the next word, or on backspace to go back
    if (currentLetterIndex === word.length && !["Enter", " ", "Backspace"].includes(pressedKey)) {
      return
    }

    // if user presses on space key
    if (e.key === " ") {
      e.preventDefault()
      // default action of pressing on space key is to scroll down
    }

    // if user presses on Backspace together with Ctrl
    if (e.key === "Backspace" && e.ctrlKey) {
      // Prevent the default behavior of backspace/delete
      e.preventDefault()
      // Remove the whole word by resetting the lettersStatuses and currentLetterIndex
      setLettersStatuses(Array.from({ length: word.length }, () => 0))
      setCurrentLetterIndex(0)
      return
    }

    // if the user presses Backspace and they are not on the first character of a word, move back one letter
    if (pressedKey === "Backspace" && currentLetterIndex > 0) {
      setCurrentLetterIndex((prevState) => prevState - 1)
      // marks erased character as letter that was not typed (0)
      setLettersStatuses((prevState) => {
        const savedPrevState = prevState
        savedPrevState[currentLetterIndex - 1] = 0
        return savedPrevState
      })
      return
    }

    if (pressedKey === "Backspace") return
    // if user presses on space and they have types last character, they will be moved to the next word

    if (pressedKey === " " && currentLetterIndex > word.length - 1) {
      goToNextWord(lettersStatuses)
    }

    // if it's the last word and the user has typed the last letter, move to the next word
    if (isLastWord && currentLetterIndex === word.length - 1) {
      goToNextWord(lettersStatuses.map((letter) => (letter === 0 ? 2 : letter)))
    }

    // if user presses on Enter , they are automatically moved to the next word
    if (["Enter"].includes(pressedKey)) {
      // if user has not typed any letters of the word
      if (!lettersStatuses.includes(1) && !lettersStatuses.includes(2)) return
      goToNextWord(lettersStatuses.map((letter) => (letter === 0 ? 1 : letter)))
    } else {
      if (pressedKey === word[currentLetterIndex]) {
        // if the pressed character is correct, mark it as correct (2)
        setLettersStatuses((prevState) => {
          const savedPrevState = prevState
          savedPrevState[currentLetterIndex] = 2
          return savedPrevState
        })
      } else {
        // if the pressed character is incorrect, mark it as incorrect (1)
        setLettersStatuses((prevState) => {
          const savedPrevState = prevState
          savedPrevState[currentLetterIndex] = 1
          return savedPrevState
        })
      }
      // moving to the next character
      setCurrentLetterIndex((prevState) => prevState + 1)
    }
  }

  useEffect(() => {
    // adds event listener that is triggered on each key press
    window.addEventListener("keydown", handleKeyPress)

    // cleans the event listener when the component unmounts
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
