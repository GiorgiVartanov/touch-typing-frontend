import { useEffect, useState, useRef } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import "./styles.scss"
import { KeyInterface } from "../../../types/keyboard.types"
import { useTypingSettingsStore } from "../../../store/context/typingSettingsContext"
import { useOnClickOutside } from "../../../hooks/useOnClickOutside"

import EditableKey from "./EditableKey"
import SelectedEditableKey from "./SelectedEditableKey"
import Button from "../../Form/Button"

interface Props {
  startingKeyboard: KeyInterface[]
  uneditableKeys?: string[]
  keySize?: number
}

// keyboard that can be edited
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
    "Backquote",
    "Digit0",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Backslash",
  ], // keycodes
  keySize = 3.25, // size of one key in rem
}: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const ref = useRef<HTMLInputElement>(null)

  const { keyboardType } = useTypingSettingsStore()

  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null)
  const [wasSelectedAtLeaseOnce, setwasSelectedAtLeaseOnce] = useState<boolean>(false)
  const [editingKeyboard, setEditingKeyboard] = useState<KeyInterface[]>(
    structuredClone(startingKeyboard) // deep copy
  ) // startingKeyboard prop is used as a default value here

  const renderKeyboard = () => {
    // will change letter
    const backslashKeyIndex = 27
    const secondBackslashIndex = 43
    const enterKeyIndex = 40

    const phantomKey: KeyInterface = {
      code: "Phantom",
      value: [""],
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
    setwasSelectedAtLeaseOnce(true)
    setCurrentlyEditing(keyCode)
  }

  const handleOnClickOutside = () => {
    setCurrentlyEditing(null)
  }

  const removeKey = (keycode: string) => {
    setEditingKeyboard((prevState) => {
      const editedKeyboard = structuredClone(prevState).map((key) => {
        if (key.code === keycode) {
          return {
            code: key.code,
            // value: [enteredCharacter?.toLowerCase() || enteredCharacter?.toUpperCase()],
            value: [""],
            type: key.type,
          }
        } else {
          return key
        }
      })

      return editedKeyboard
    })
  }

  const renderKey = (key: KeyInterface) => {
    // is true if this value has at least 2 copies somewhere on a keyboard
    const isDuplicate = editingKeyboard.some(
      (keyboardKey) =>
        keyboardKey.type === "Letter" &&
        keyboardKey.type === "Letter" &&
        keyboardKey !== key &&
        (key.value[0] === keyboardKey.value[0] ||
          (keyboardKey.value[1] != undefined && key.value[0] === keyboardKey.value[1]) ||
          (key.value[1] != undefined && key.value[1] === keyboardKey.value[0]) ||
          (key.value[1] != undefined &&
            keyboardKey.value[1] != undefined &&
            key.value[1] === keyboardKey.value[1]))
    )

    return (
      <EditableKey
        value={key.value}
        code={key.code}
        isEditing={key.code === currentlyEditing}
        onClick={() => {
          selectAsEditable(key.code)
        }}
        key={key.code}
        isPressed={pressedKeys.includes(key.code)}
        isEditable={!uneditableKeys.includes(key.code)}
        isEmpty={key.value[0] === ""}
        isDuplicate={isDuplicate}
        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault()

          removeKey(key.code)
        }}
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

  const renderSelectedKey = () => {
    const editingKey = editingKeyboard.find((key) => key.code === currentlyEditing)

    const handleOnFirstValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const enteredCharacter = e.nativeEvent?.data

      // if (!enteredCharacter) return

      setEditingKeyboard((prevState) => {
        const editedKeyboard = structuredClone(prevState).map((key) => {
          if (key.code === currentlyEditing) {
            return {
              code: key.code,
              // value: [enteredCharacter?.toLowerCase() || enteredCharacter?.toUpperCase()],
              value: key.value[1]
                ? [enteredCharacter?.toLowerCase() || "", key.value[1] || ""]
                : [enteredCharacter?.toLowerCase() || ""],
              type: key.type,
            }
          } else {
            return key
          }
        })

        return editedKeyboard
      })
    }

    const handleOnSecondValueChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const enteredCharacter = e.nativeEvent?.data

      // if (!enteredCharacter) return

      setEditingKeyboard((prevState) => {
        const editedKeyboard = structuredClone(prevState).map((key) => {
          if (key.code === currentlyEditing) {
            return {
              code: key.code,
              value: [
                // key.value[0] || enteredCharacter?.toLowerCase(),
                key.value[0] || "",
                enteredCharacter?.toUpperCase() || "",
              ],
              type: key.type,
            }
          } else {
            return key
          }
        })

        return editedKeyboard
      })
    }

    return (
      <SelectedEditableKey
        editingKey={editingKey || null}
        onFirstValueChange={handleOnFirstValueChange}
        onSecondValueChange={handleOnSecondValueChange}
        wasSelectedAtLeaseOnce={wasSelectedAtLeaseOnce}
      />
    )
  }

  const renderEditableKeyboardButtons = () => {
    const compareKeyboards = (keyboard1: KeyInterface[], keyboard2: KeyInterface[]) => {
      if (keyboard1.length !== keyboard2.length) {
        return false
      }

      for (let i = 0; i < keyboard1.length; i++) {
        if (
          keyboard1[i].value[0] !== keyboard2[i].value[0] ||
          keyboard1[i].value[1] !== keyboard2[i].value[1]
        ) {
          return true
        }
      }

      return false
    }

    const wasKeyboardChanged = compareKeyboards(editingKeyboard, startingKeyboard)

    const emptyEditableKeys = () => {
      setEditingKeyboard((prevState) => {
        const currentKeyboard = structuredClone(prevState)
        const filteredKeyboard = currentKeyboard.map((key) => {
          if (uneditableKeys.includes(key.code)) return key
          else return { code: key.code, value: [""], type: key.type }
        })

        return filteredKeyboard
      })
    }

    const resetKeys = () => {
      setEditingKeyboard(startingKeyboard)
    }

    const optimizeLayout = () => {
      toast.warning("This feature is not yet implemented")
    }

    return (
      <div className="editable-keyboard-buttons">
        {/* <Button
          onClick={() => {}}
          className="empty-editable-keys-button"
        >
          Options
        </Button> */}
        <Button
          onClick={emptyEditableKeys}
          className="empty-editable-keys-button"
        >
          {t("Empty every editable key")}
        </Button>
        {wasKeyboardChanged ? (
          <Button
            onClick={resetKeys}
            className="reset-keys-button"
          >
            {t("Reset keyboard")}
          </Button>
        ) : null}
        <Button
          onClick={optimizeLayout}
          className="save-layout-button"
        >
          {t("Save")}
        </Button>
        <Button
          onClick={optimizeLayout}
          className="optimize-layout-button"
        >
          {t("Optimize")}
        </Button>
      </div>
    )
  }

  useOnClickOutside(ref, handleOnClickOutside)

  useEffect(() => {
    // editing keyboard will reset when user changes keyboard
    setEditingKeyboard(structuredClone(startingKeyboard))
  }, [startingKeyboard])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      if (pressedKey === "Alt" || pressedKey === "Space") event.preventDefault()

      if (pressedKey === "CapsLock") {
        setPressedKeys((prevState) => {
          if (prevState.includes("CapsLock")) {
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
    <div
      ref={ref}
      className="editable-keyboard-holder"
    >
      {renderSelectedKey()}

      <div
        style={{ "--key-size": `${keySize}rem` } as React.CSSProperties}
        className={`keyboard editable-keyboard keyboard-${keyboardType}`}
      >
        {renderKeyboard()}
      </div>
      {renderEditableKeyboardButtons()}
    </div>
  )
}
export default EditableKeyboard
