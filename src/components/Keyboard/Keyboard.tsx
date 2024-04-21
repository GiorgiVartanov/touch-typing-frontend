import { useState } from "react"

import "./styles.scss"
import { KeyInterface } from "../../types/keyboard.types"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"
import { KeyboardLanguageType } from "../../types/typer.types/typingSettings.types"

import EditableKeyboard from "./EditableKeyboard/EditableKeyboard"
import TypeableKeyboard from "./TypeableKeyboard/TypeableKeyboard"

interface Props {
  forcedKeyboardLayout?: KeyboardLayoutInterface // keyboard layout that will be user even if user has selected a different one
  forcedLanguage?: KeyboardLanguageType // language that user will be forced to use (they won't be able to change it)
  inactiveKeys?: string[] // keys that wont have a visual effect when user presses on their corresponding key on a keyboard
  showSelectButton: boolean // shows button to select a keyboard
  showEditButton: boolean // shows button to edit a keyboard
  showLanguageSelector: boolean // shows language selector
  showKeyboardTypeSelector: boolean
  keySize?: number // size of a single key in rems
  showUtilityButtons: boolean

  mode?: "editing" | "editable" | "uneditable"
  // editing - is in edit mode from the start
  // editable - can be changed from editing mode to typing mode
  // uneditable - can't be edited

  startingKeyboard?: KeyInterface[] // if in editing mode, it will be starting layout
}

const Keyboard = ({
  forcedKeyboardLayout,
  forcedLanguage,
  showSelectButton,
  showEditButton,
  inactiveKeys = ["Tab", "AltRight", "AltLeft", "MetaRight", "MetaLeft", "ContextMenu", ""],
  showLanguageSelector,
  showKeyboardTypeSelector,
  keySize = 3.25,
  mode = "uneditable",
  showUtilityButtons = false,
  startingKeyboard,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const handleEditing = () => {
    if (mode === "uneditable" || mode === "editing") return

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
        showKeyboardTypeSelector={showKeyboardTypeSelector}
        inactiveKeys={inactiveKeys}
        showLanguageSelector={showLanguageSelector}
        showUtilityButtons={showUtilityButtons}
        keySize={keySize}
      />
    )
  }
}
export default Keyboard
