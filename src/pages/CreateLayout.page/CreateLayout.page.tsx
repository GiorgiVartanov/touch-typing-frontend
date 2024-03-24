import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"
// import EditableKeyboard from "../../components/Keyboard/EditableKeyboard"

import { keyboard as qwertyLayout } from "../../keyboardLayouts/qwerty.json"
import { keyboard as qwertyGeorgianLayout } from "../../keyboardLayouts/geo.json"
import { keyboard as dvorakLayout } from "../../keyboardLayouts/dvorak.json"
import { keyboard as colemakLayout } from "../../keyboardLayouts/colemak.json"
import { keyboard as workmanLayout } from "../../keyboardLayouts/workman.json"

const CreateLayoutPage = () => {
  const { typingLanguage } = useTypingSettingsStore()

  let currentKeyboard = qwertyLayout

  switch (typingLanguage) {
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

  return (
    <PageLayout className="create-layout-page">
      {/* <EditableKeyboard
        size="medium"
        keyboard={currentKeyboard}
      /> */}
      <Keyboard
        size="medium"
        keyboard={currentKeyboard}
      />
    </PageLayout>
  )
}
export default CreateLayoutPage
