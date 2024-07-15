import "./styles.scss"

import { KeyInterface, KeyboardLayoutInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"
import qwertyGeorgianLayout from "../../keyboardLayouts/geo2.json"

const CreateLayoutPage = () => {
  const qwertyGeorgianKeyboardLayout: KeyboardLayoutInterface =
    qwertyGeorgianLayout as KeyboardLayoutInterface

  const currentKeyboard = qwertyGeorgianKeyboardLayout.keyboard as KeyInterface[]

  return (
    <PageLayout className="create-layout-page">
      <Keyboard
        startingKeyboard={currentKeyboard as KeyInterface[]}
        showSelectButton={false}
        showEditButton={false}
        showLanguageSelector={true}
        showKeyboardTypeSelector={true}
        showUtilityButtons={true}
        showHideKeyboardButton={false}
        mode="editing"
      />
    </PageLayout>
  )
}
export default CreateLayoutPage
