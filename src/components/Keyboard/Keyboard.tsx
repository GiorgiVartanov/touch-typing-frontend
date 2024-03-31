import { useEffect, useState } from "react"

import "./styles.scss"
import { KeyInterface } from "../../types/keyboard.types"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

import Key from "./Key"

interface Props {
  keyboard: KeyInterface[]
  inactiveKeys?: string[]
  keyboardPosition?: "normal" | "bottom"
  size?: "small" | "medium"
}

const Keyboard = ({
  keyboard,
  inactiveKeys = ["Tab", "AltRight", "AltLeft", "MetaRight", "MetaLeft", "ContextMenu", ""],
  keyboardPosition = "normal",
  size = "small",
}: Props) => {
  const { keyboardType } = useTypingSettingsStore()

  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  const renderKeyboard = () => {
    const backslashKeyIndex = 27
    const secondBackslashIndex = 43
    const enterKeyIndex = 40

    const phantomKey: KeyInterface = {
      code: "Phantom",
      value: "",
      type: "Letter",
    }

    const secondBackslash: KeyInterface = {
      ...keyboard[backslashKeyIndex],
      code: "Backslash-2",
    }

    const tempKeyboard = [...keyboard]

    switch (keyboardType) {
      case "ANSI":
        return tempKeyboard.map((key) => renderKey(key))
      case "ISO":
        tempKeyboard[enterKeyIndex] = keyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = keyboard[enterKeyIndex]

        tempKeyboard.splice(secondBackslashIndex - 2, 0, phantomKey)
        tempKeyboard.splice(secondBackslashIndex, 0, secondBackslash)

        return tempKeyboard.map((key) => renderKey(key))
      case "ANSI-ISO":
        tempKeyboard[enterKeyIndex] = keyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = keyboard[enterKeyIndex]

        return tempKeyboard.map((key) => renderKey(key))
      case "ABNT":
        return tempKeyboard.map((key) => renderKey(key))
      case "KS":
        return tempKeyboard.map((key) => renderKey(key))
      case "JIS":
        return tempKeyboard.map((key) => renderKey(key))
      default:
        return tempKeyboard.map((key) => renderKey(key))
    }
  }

  const renderKey = (key: KeyInterface) => {
    return (
      <Key
        value={key.value}
        key={key.code}
        type={key.type}
        isPressed={pressedKeys.includes(key.code)}
        isActive={!inactiveKeys.includes(key.code)}
        inUppercase={
          (pressedKeys.includes("ShiftLeft") ||
            pressedKeys.includes("ShiftRight") ||
            (pressedKeys.includes("CapsLock") && key.type === "Letter")) &&
          !(
            (pressedKeys.includes("ShiftLeft") && pressedKeys.includes("CapsLock")) ||
            (pressedKeys.includes("ShiftRight") && pressedKeys.includes("CapsLock"))
          )
        }
        className={`${key.type}-key ${key.code}-key`}
      />
    )
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      if (pressedKey === "Alt" || pressedKey === "Space") event.preventDefault()

      if (pressedKey === "CapsLock") {
        setPressedKeys((prevState) => {
          if (prevState.includes("capslock")) {
            return prevState.filter((key) => key !== "CapsLock")
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
        setPressedKeys((prevState) => prevState.filter((key) => key !== "CapsLock"))
      }
    }

    const handleKeyUnPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      if (pressedKey === "Alt" || pressedKey === "Space") event.preventDefault()

      if (pressedKey === "CapsLock") return

      setPressedKeys((prevState) => prevState.filter((key) => key !== pressedKey))
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyUnPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyUnPress)
    }
  }, [])

  return (
    <div
      className={`keyboard keyboard-position-${keyboardPosition} keyboard-${keyboardType} keyboard-size-${size}`}
    >
      {renderKeyboard()}
    </div>
  )
}
export default Keyboard
