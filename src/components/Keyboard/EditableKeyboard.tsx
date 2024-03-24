import { useEffect, useState } from "react"

import "./styles.scss"

import EditableKey from "./EditableKey"

interface Props {
  keyboard?: {
    key: string
    value: string | string[]
    showBoth: boolean
    triggeredByCapsLock: boolean
  }[][]
  uneditableKeys?: string[]
  size?: "small" | "medium"
}

const EditableKeyboard = ({
  keyboard = [
    [
      { key: "backquote", value: ["`", "~"], showBoth: true, triggeredByCapsLock: false },
      { key: "1", value: ["1", "!"], showBoth: true, triggeredByCapsLock: false },
      { key: "2", value: ["2", "@"], showBoth: true, triggeredByCapsLock: false },
      { key: "3", value: ["3", "#"], showBoth: true, triggeredByCapsLock: false },
      { key: "4", value: ["4", "$"], showBoth: true, triggeredByCapsLock: false },
      { key: "5", value: ["5", "%"], showBoth: true, triggeredByCapsLock: false },
      { key: "6", value: ["6", "^"], showBoth: true, triggeredByCapsLock: false },
      { key: "7", value: ["7", "&"], showBoth: true, triggeredByCapsLock: false },
      { key: "8", value: ["8", "*"], showBoth: true, triggeredByCapsLock: false },
      { key: "9", value: ["9", "("], showBoth: true, triggeredByCapsLock: false },
      { key: "0", value: ["0", ")"], showBoth: true, triggeredByCapsLock: false },
      { key: "minus", value: ["-", "_"], showBoth: true, triggeredByCapsLock: false },
      { key: "equal", value: ["=", "+"], showBoth: true, triggeredByCapsLock: false },
      { key: "backspace", value: "Backspace", showBoth: true, triggeredByCapsLock: false },
    ],
    [
      { key: "tab", value: "Tab", showBoth: true, triggeredByCapsLock: false },
      { key: "q", value: ["q", "Q"], showBoth: false, triggeredByCapsLock: true },
      { key: "w", value: ["w", "W"], showBoth: false, triggeredByCapsLock: true },
      { key: "e", value: ["e", "E"], showBoth: false, triggeredByCapsLock: true },
      { key: "r", value: ["r", "R"], showBoth: false, triggeredByCapsLock: true },
      { key: "t", value: ["t", "T"], showBoth: false, triggeredByCapsLock: true },
      { key: "y", value: ["y", "Y"], showBoth: false, triggeredByCapsLock: true },
      { key: "u", value: ["u", "U"], showBoth: false, triggeredByCapsLock: true },
      { key: "i", value: ["i", "I"], showBoth: false, triggeredByCapsLock: true },
      { key: "o", value: ["o", "O"], showBoth: false, triggeredByCapsLock: true },
      { key: "p", value: ["p", "P"], showBoth: false, triggeredByCapsLock: true },
      { key: "bracketleft", value: ["[", "{"], showBoth: true, triggeredByCapsLock: false },
      { key: "bracketright", value: ["]", "}"], showBoth: true, triggeredByCapsLock: false },
      { key: "backslash", value: ["\\", "|"], showBoth: true, triggeredByCapsLock: false },
    ],
    [
      { key: "capslock", value: "CapsLock", showBoth: true, triggeredByCapsLock: false },
      { key: "a", value: ["a", "A"], showBoth: false, triggeredByCapsLock: true },
      { key: "s", value: ["s", "S"], showBoth: false, triggeredByCapsLock: true },
      { key: "d", value: ["d", "D"], showBoth: false, triggeredByCapsLock: true },
      { key: "f", value: ["f", "F"], showBoth: false, triggeredByCapsLock: true },
      { key: "g", value: ["g", "G"], showBoth: false, triggeredByCapsLock: true },
      { key: "h", value: ["h", "H"], showBoth: false, triggeredByCapsLock: true },
      { key: "j", value: ["j", "J"], showBoth: false, triggeredByCapsLock: true },
      { key: "k", value: ["k", "K"], showBoth: false, triggeredByCapsLock: true },
      { key: "l", value: ["l", "L"], showBoth: false, triggeredByCapsLock: true },
      { key: "semicolon", value: [";", ":"], showBoth: true, triggeredByCapsLock: false },
      { key: "quote", value: ["'", '"'], showBoth: true, triggeredByCapsLock: false },
      { key: "enter", value: "Enter", showBoth: true, triggeredByCapsLock: false },
    ],
    [
      { key: "shiftleft", value: "Shift", showBoth: true, triggeredByCapsLock: false },
      { key: "z", value: ["z", "Z"], showBoth: false, triggeredByCapsLock: true },
      { key: "x", value: ["x", "X"], showBoth: false, triggeredByCapsLock: true },
      { key: "c", value: ["c", "C"], showBoth: false, triggeredByCapsLock: true },
      { key: "v", value: ["v", "V"], showBoth: false, triggeredByCapsLock: true },
      { key: "b", value: ["b", "B"], showBoth: false, triggeredByCapsLock: true },
      { key: "n", value: ["n", "N"], showBoth: false, triggeredByCapsLock: true },
      { key: "m", value: ["m", "M"], showBoth: false, triggeredByCapsLock: true },
      { key: "comma", value: [",", "<"], showBoth: true, triggeredByCapsLock: false },
      { key: "period", value: [".", ">"], showBoth: true, triggeredByCapsLock: false },
      { key: "slash", value: ["/", "?"], showBoth: true, triggeredByCapsLock: false },
      { key: "shiftright", value: "Shift", showBoth: true, triggeredByCapsLock: false },
    ],
    [
      { key: "controlleft", value: "Ctrl", showBoth: false, triggeredByCapsLock: false },
      { key: "metaleft", value: "Meta", showBoth: false, triggeredByCapsLock: false },
      { key: "altleft", value: "Alt", showBoth: false, triggeredByCapsLock: false },
      { key: "space", value: " ", showBoth: false, triggeredByCapsLock: false },
      { key: "altright", value: "Alt", showBoth: false, triggeredByCapsLock: false },
      { key: "metaright", value: "Meta", showBoth: false, triggeredByCapsLock: false },
      { key: "contextmenu", value: "Menu", showBoth: false, triggeredByCapsLock: false },
      { key: "controlright", value: "Ctrl", showBoth: false, triggeredByCapsLock: false },
    ],
  ],
  uneditableKeys = [
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
    "minus",
    "equal",
    "tab",
    "altright",
    "altleft",
    "metaright",
    "metaleft",
    "contextmenu",
    "backspace",
    "capslock",
    "shiftleft",
    "shiftright",
    "controlleft",
    "controlright",
    "space",
    "enter",
    "",
  ],
  size = "small",
}: Props) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [currentlyDraggedKey, setCurrentlyDraggedKey] = useState<string | null>(null)
  const [candidateForSwap, setCandidateForSwap] = useState<string | null>(null)

  const handleDragStart = (id: string) => {
    setCurrentlyDraggedKey(id)
  }

  const handleDragFinish = () => {
    setCurrentlyDraggedKey(null)
  }

  const handleDragOver = (id: string) => {
    setCandidateForSwap(id)
  }

  const handleFinishDrag = () => {
    // setCandidateForSwap(null)
  }

  const handleDrop = () => {
    // console.log(`swapping ${currentlyDraggedKey} with ${candidateForSwap}`)
  }

  const renderKeyboard = () => {
    return keyboard.map((row, index) => renderRow(row, index))
  }

  const renderRow = (
    row: {
      key: string
      value: string | string[]
      showBoth: boolean
      triggeredByCapsLock: boolean
    }[],
    index: number
  ) => {
    return (
      <div
        className="row"
        key={index}
      >
        {row.map((key) => renderEditableKey(key))}
      </div>
    )
  }

  const renderEditableKey = (key: {
    key: string
    value: string | string[]
    showBoth: boolean
    triggeredByCapsLock: boolean
  }) => {
    return (
      <EditableKey
        value={key.value}
        id={key.key}
        key={key.key}
        isPressed={pressedKeys.includes(key.key)}
        isEditable={!uneditableKeys.includes(key.key)}
        showBoth={key.showBoth}
        onDrop={handleDrop}
        isDraggingOver={key.key === candidateForSwap}
        onDragStart={() => {
          handleDragStart(key.key)
        }}
        onDragFinish={handleDragFinish}
        onMouseEnter={() => {
          handleDragOver(key.key)
        }}
        onMouseLeave={handleFinishDrag}
        inUppercase={
          (pressedKeys.includes("shiftleft") ||
            pressedKeys.includes("shiftright") ||
            (pressedKeys.includes("capslock") && key.triggeredByCapsLock)) &&
          !(
            (pressedKeys.includes("shiftleft") && pressedKeys.includes("capslock")) ||
            (pressedKeys.includes("shiftright") && pressedKeys.includes("capslock"))
          )
        }
        className={`${key.key}-key`}
      />
    )
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.code.replace("Key", "").replace("Digit", "").toLocaleLowerCase()

      if (pressedKey === "alt" || pressedKey === "space") event.preventDefault()

      if (pressedKey === "capslock") {
        setPressedKeys((prevState) => {
          if (prevState.includes("capslock")) {
            return prevState.filter((key) => key !== "capslock")
          } else {
            return [...prevState, pressedKey]
          }
        })
      } else {
        setPressedKeys((prevState) => {
          if (prevState.includes(pressedKey)) return prevState
          return [...prevState, pressedKey]
        })
      }

      if (event.getModifierState("CapsLock")) {
        setPressedKeys((prevState) => [...prevState, pressedKey])
      } else {
        setPressedKeys((prevState) => prevState.filter((key) => key !== "capslock"))
      }
    }

    const handleKeyUnPress = (event: KeyboardEvent) => {
      const pressedKey = event.code.replace("Key", "").replace("Digit", "").toLocaleLowerCase()

      if (pressedKey === "alt" || pressedKey === "space") event.preventDefault()

      if (pressedKey === "capslock") return

      setPressedKeys((prevState) => prevState.filter((key) => key !== pressedKey))
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyUnPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyUnPress)
    }
  }, [])

  return <div className={`keyboard keyboard-size-${size}`}>{renderKeyboard()}</div>
}
export default EditableKeyboard
