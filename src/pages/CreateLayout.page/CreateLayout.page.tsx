import { useState } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"

import { KeyInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"
import EditableKeyboard from "../../components/Keyboard/EditableKeyboard/EditableKeyboard"
import Button from "../../components/Form/Button"

import { keyboard as qwertyLayout } from "../../keyboardLayouts/qwerty.json"
import { keyboard as qwertyGeorgianLayout } from "../../keyboardLayouts/geo.json"
import { keyboard as dvorakLayout } from "../../keyboardLayouts/dvorak.json"
import { keyboard as colemakLayout } from "../../keyboardLayouts/colemak.json"
import { keyboard as workmanLayout } from "../../keyboardLayouts/workman.json"

const CreateLayoutPage = () => {
  const { keyboardLayout } = useTypingSettingsStore()

  const [isEditing, setIsEditing] = useState<boolean>(true)

  let currentKeyboard = qwertyLayout

  // temporary
  switch (keyboardLayout) {
    case "QWERTY":
      currentKeyboard = qwertyLayout
      break
    case "QWERTY georgian":
      currentKeyboard = qwertyGeorgianLayout
      break
    case "Dvorak":
      currentKeyboard = dvorakLayout
      break
    case "Colemak":
      currentKeyboard = colemakLayout
      break
    case "Workman":
      currentKeyboard = workmanLayout
      break
    default:
      currentKeyboard = qwertyLayout
  }

  // const handleStartEditing = () => {
  //   setIsEditing(true)
  // }

  // const handleFinishEditing = () => {
  //   setIsEditing(false)
  // }

  return (
    <PageLayout className="create-layout-page">
      <EditableKeyboard startingKeyboard={currentKeyboard as KeyInterface[]} />
    </PageLayout>
  )
}
export default CreateLayoutPage
