import { useEffect, useState } from "react"

import "./styles.scss"
import { KeyInterface, KeyType } from "../../types/keyboard.types"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

import EditableKey from "./EditableKey"
import Key from "./Key"

interface Props {
  startingKeyboard: KeyInterface[]
  uneditableKeys?: string[]
  size?: "small" | "medium"
}

const EditableKeyboard = ({
  startingKeyboard,
  uneditableKeys = [
    "Tab",
    "AltRight",
    "AltLeft",
    "MetaRight",
    "MetaLeft",
    "ContextMenu",
    "Space",
    "ControlLeft",
    "ControlRight",
    "ShiftLeft",
    "ShiftRight",
    "CapsLock",
    "Enter",
    "Backspace",
  ],
  size = "small",
}: Props) => {
  const { keyboardType } = useTypingSettingsStore()

  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null)
  const [editingKeyboard, setEditingKeyboard] = useState<KeyInterface[]>(
    structuredClone(startingKeyboard)
  ) // startingKeyboard prop is used as a default value here

  const handleOnEditingKeyChange = (
    keyCode: string,
    type: KeyType,
    firstValue: string | null,
    secondValue: string | null
  ) => {
    setEditingKeyboard((prevState) => {
      const keyboard = [...prevState]
      const changedKeyIndex = keyboard.findIndex((key) => key.code === keyCode)
      keyboard[changedKeyIndex].value = [
        firstValue || keyboard[changedKeyIndex].value[0],
        secondValue || keyboard[changedKeyIndex].value[1],
      ]
      keyboard[changedKeyIndex].type = type

      return keyboard
    })
  }

  // const swapKeys = (keyCode1: string, keyCode2: string) => {
  //   const key1 = editingKeyboard.find((key) => key.code === keyCode1)
  //   const key2 = editingKeyboard.find((key) => key.code === keyCode2)

  //   if (!key1 || !key2) return

  //   handleOnEditingKeyChange(keyCode1, key2.type, key2.value[0], key2.value[1])

  //   handleOnEditingKeyChange(keyCode2, key1.type, key1.value[0], key1.value[1])
  // }

  const renderKeyboard = () => {
    // will change letter
    const backslashKeyIndex = 27
    const secondBackslashIndex = 43
    const enterKeyIndex = 40

    const phantomKey: KeyInterface = {
      code: "Phantom",
      value: "",
      type: "Letter",
    }

    const secondBackslash: KeyInterface = {
      ...startingKeyboard[backslashKeyIndex],
      code: "Backslash-2",
    }

    const tempKeyboard = [...editingKeyboard]

    switch (keyboardType) {
      case "ANSI":
        return tempKeyboard.map((key) => renderKey(key))
      case "ISO":
        tempKeyboard[enterKeyIndex] = startingKeyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = startingKeyboard[enterKeyIndex]

        tempKeyboard.splice(secondBackslashIndex - 2, 0, phantomKey)
        tempKeyboard.splice(secondBackslashIndex, 0, secondBackslash)

        return tempKeyboard.map((key) => renderKey(key))
      case "ANSI-ISO":
        tempKeyboard[enterKeyIndex] = startingKeyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = startingKeyboard[enterKeyIndex]

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

  const selectAsEditable = (keyCode: string) => {
    setCurrentlyEditing(keyCode)
  }

  // change this name
  const unselectAsEditable = () => {
    // setCurrentlyEditing(null)
  }

  const renderKey = (key: KeyInterface) => {
    return (
      <EditableKey
        value={key.value}
        code={key.code}
        isEditing={key.code === currentlyEditing}
        onClick={() => {
          selectAsEditable(key.code)
        }}
        onClickOutside={unselectAsEditable}
        key={key.code}
        type={key.type}
        isPressed={pressedKeys.includes(key.code)}
        isEditable={!uneditableKeys.includes(key.code)}
        inUppercase={
          (pressedKeys.includes("ShiftLeft") ||
            pressedKeys.includes("ShiftRight") ||
            (pressedKeys.includes("CapsLock") && key.type === "Letter")) &&
          !(
            (pressedKeys.includes("ShiftLeft") && pressedKeys.includes("CapsLock")) ||
            (pressedKeys.includes("ShiftRight") && pressedKeys.includes("CapsLock"))
          )
        }
        onChange={handleOnEditingKeyChange}
        className={`${key.type}-key ${key.code}-key`}
      />
    )
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      const pressedKeyValue = startingKeyboard.find((key) => key.code === pressedKey)

      if (pressedKey === "Esc") {
        unselectAsEditable()
      }

      if (pressedKey === "Tab") {
        event.preventDefault() // will change latter

        const currentSelectedKeyIndex = editingKeyboard.findIndex((key) => {
          return key.code === currentlyEditing
        })

        const selectNextKey = (currentIndex: number): string => {
          let nextKeyIndex = 0

          if (currentIndex < editingKeyboard.length - 2) {
            nextKeyIndex = currentIndex + 1
          } else {
            nextKeyIndex = 0
          }

          const nextKey = editingKeyboard[nextKeyIndex]

          if (nextKey.type === "Modifier") return selectNextKey(nextKeyIndex)
          else return nextKey.code
        }

        selectAsEditable(selectNextKey(currentSelectedKeyIndex))
      }

      if (currentlyEditing && !uneditableKeys.includes(pressedKey) && pressedKeyValue) {
        handleOnEditingKeyChange(
          currentlyEditing,
          pressedKeyValue.type,
          pressedKeyValue.value[0],
          pressedKeyValue.value[1]
        )
        // swapKeys(pressedKeyValue.code, currentlyEditing)
      }

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
  }, [currentlyEditing, editingKeyboard])

  return (
    <div className={`keyboard keyboard-${keyboardType} keyboard-size-${size}`}>
      {renderKeyboard()}
    </div>
  )
}
export default EditableKeyboard
