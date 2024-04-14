import { useEffect, useState } from "react"

import "./styles.scss"
import { KeyInterface } from "../../../types/keyboard.types"
import { KeyboardLayoutInterface } from "../../../types/keyboard.types"
import { useTypingSettingsStore } from "../../../store/context/typingSettingsContext"

import Key from "./Key"
import KeyboardOptions from "../KeyboardOptions"

interface Props {
  forcedKeyboardLayout?: KeyboardLayoutInterface
  forcedLanguage?: "En" | "Geo"
  handleEditing: () => void
  inactiveKeys?: string[]
  showSelectButton?: boolean
  showEditButton?: boolean
  showLanguageSelector?: boolean
  keySize?: number
}

const TypeableKeyboard = ({
  forcedKeyboardLayout,
  forcedLanguage,
  handleEditing,
  showSelectButton = true,
  showEditButton = false,
  inactiveKeys = ["Tab", "AltRight", "AltLeft", "MetaRight", "MetaLeft", "ContextMenu", ""],
  showLanguageSelector = true,
  keySize = 3.25,
}: Props) => {
  const {
    keyboardType,
    keyboardLanguage,
    keyboardLayout: currentKeyboardLayout,
  } = useTypingSettingsStore()

  const keyboardLayout =
    forcedKeyboardLayout || currentKeyboardLayout[forcedLanguage || keyboardLanguage]
  const keyboard = keyboardLayout.keyboard

  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  const renderKeyboard = () => {
    const backslashKeyIndex = 27
    const secondBackslashIndex = 43
    const enterKeyIndex = 40

    const phantomKey: KeyInterface = {
      code: "Phantom",
      value: [""],
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
        isPressed={pressedKeys.includes(key.code)}
        isActive={!inactiveKeys.includes(key.code)}
        inUppercase={
          (pressedKeys.includes("ShiftLeft") ||
            pressedKeys.includes("ShiftRight") ||
            (pressedKeys.includes("CapsLock") &&
              key.type === "Letter" &&
              key.value[0]?.toLocaleLowerCase() === key.value[1]?.toLowerCase())) &&
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

      if (
        pressedKey === "Alt" ||
        pressedKey === "Space" ||
        pressedKey === "Quote" ||
        pressedKey === "Slash"
      )
        event.preventDefault()

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

      if (
        pressedKey === "Alt" ||
        pressedKey === "Space" ||
        pressedKey === "Quote" ||
        pressedKey === "Slash"
      )
        event.preventDefault()

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
    <div className="keyboard-wrapper">
      <KeyboardOptions
        forcedLanguage={(forcedKeyboardLayout?.language as "En" | "Geo") || forcedLanguage}
        showSelectButton={showSelectButton}
        showEditButton={showEditButton}
        showLanguageSelector={showLanguageSelector}
        newKeyboardLayout={keyboardLayout}
        handleEditing={handleEditing}
      />
      <div
        style={{ "--key-size": `${keySize}rem` } as React.CSSProperties}
        className={`keyboard keyboard-${keyboardType}`}
      >
        {renderKeyboard()}
      </div>
    </div>
  )
}
export default TypeableKeyboard
