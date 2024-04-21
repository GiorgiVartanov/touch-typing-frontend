import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"

const CreateLayoutPage = () => {
  const { keyboardLayout, keyboardLanguage } = useTypingSettingsStore()

  const currentKeyboard = keyboardLayout[keyboardLanguage].keyboard

  return (
    <PageLayout className="create-layout-page">
      <Keyboard
        startingKeyboard={currentKeyboard}
        showSelectButton={false}
        showEditButton={false}
        showLanguageSelector={true}
        showKeyboardTypeSelector={true}
        showUtilityButtons={true}
        mode="editing"
      />
    </PageLayout>
  )
}
export default CreateLayoutPage
