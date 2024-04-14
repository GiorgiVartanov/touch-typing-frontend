import { useEffect, useState } from "react"

import "./styles.scss"
import { KeyInterface } from "../../types/keyboard.types"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"

import Key from "./TypeableKeyboard/Key"
import KeyboardOptions from "./KeyboardOptions"

import EditableKeyboard from "./EditableKeyboard/EditableKeyboard"
import TypeableKeyboard from "./TypeableKeyboard/TypeableKeyboard"

interface Props {
  forcedKeyboardLayout?: KeyboardLayoutInterface
  forcedLanguage?: "En" | "Geo"
  inactiveKeys?: string[]
  showSelectButton?: boolean
  showEditButton?: boolean
  showLanguageSelector?: boolean
  keySize?: number
  mode: "editing" | "editable" | "uneditable"
  startingKeyboard?: KeyInterface[]
}

const Keyboard = ({
  forcedKeyboardLayout,
  forcedLanguage,
  showSelectButton = true,
  showEditButton = false,
  inactiveKeys = ["Tab", "AltRight", "AltLeft", "MetaRight", "MetaLeft", "ContextMenu", ""],
  showLanguageSelector = true,
  keySize = 3.25,
  mode = "editable",
  startingKeyboard,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleEditing = () => {
    setIsEditing((prevState) => !prevState)
  }

  if ((isEditing || mode === "editing") && startingKeyboard) {
    return (
      <EditableKeyboard
        startingKeyboard={startingKeyboard}
        handleEditing={handleEditing}
        keySize={keySize}
      />
    )
  } else {
    return (
      <TypeableKeyboard
        forcedKeyboardLayout={forcedKeyboardLayout}
        forcedLanguage={forcedLanguage}
        handleEditing={handleEditing}
        showSelectButton={showSelectButton}
        showEditButton={showEditButton}
        inactiveKeys={inactiveKeys}
        showLanguageSelector={showLanguageSelector}
        keySize={keySize}
      />
    )
  }
}
export default Keyboard
