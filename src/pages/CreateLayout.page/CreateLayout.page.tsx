import "./styles.scss"
import georgianQwerty from "../../keyboardLayouts/geo.json"
import { KeyInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"

const CreateLayoutPage = () => {
  const currentKeyboard = georgianQwerty.keyboard as KeyInterface[]

  const symbolsToHide = ["Minus", "Semicolon", "Period", "Comma", "Quote", "Slash"]

  const keyboardWithoutLetters = currentKeyboard.map((key) => {
    if (key.type === "Letter" || symbolsToHide.includes(key.code)) {
      return {
        code: key.code,
        value: ["", ""],
        type: key.type,
      }
    } else {
      return key
    }
  })

  console.log(keyboardWithoutLetters)

  return (
    <PageLayout className="create-layout-page">
      <Keyboard
        startingKeyboard={keyboardWithoutLetters as KeyInterface[]}
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
