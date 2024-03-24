import { useEffect, useState } from "react"

import "./styles.scss"

import Key from "./Key"

interface Props {
  keyboard: {
    key: string
    value: string | string[]
    showBoth: boolean
    triggeredByCapsLock: boolean
    showInReverse: boolean
  }[][]
  inactiveKeys?: string[]
  size?: "small" | "medium"
}

const Keyboard = ({
  keyboard,
  inactiveKeys = ["tab", "altright", "altleft", "metaright", "metaleft", "contextmenu", ""],
  size = "small",
}: Props) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  const renderKeyboard = () => {
    return keyboard.map((row, index) => renderRow(row, index))
  }

  const renderRow = (
    row: {
      key: string
      value: string | string[]
      showBoth: boolean
      triggeredByCapsLock: boolean
      showInReverse: boolean
    }[],
    index: number
  ) => {
    return (
      <div
        className="row"
        key={index}
      >
        {row.map((key) => renderKey(key))}
      </div>
    )
  }

  const renderKey = (key: {
    key: string
    value: string | string[]
    showBoth: boolean
    triggeredByCapsLock: boolean
    showInReverse: boolean
  }) => {
    return (
      <Key
        value={key.value}
        id={key.key}
        key={key.key}
        isPressed={pressedKeys.includes(key.key)}
        isActive={!inactiveKeys.includes(key.key)}
        showInReverse={key.showInReverse}
        showBoth={key.showBoth}
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
export default Keyboard
