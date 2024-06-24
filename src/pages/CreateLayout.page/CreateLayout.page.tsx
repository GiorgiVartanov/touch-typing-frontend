import "./styles.scss"
import georgianQwerty from "../../keyboardLayouts/geo.json"
import { KeyInterface, KeyboardLayoutInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"
import qwertyGeorgianLayout from "../../keyboardLayouts/geo-opt.json"

const CreateLayoutPage = () => {
  const qwertyGeorgianKeyboardLayout: KeyboardLayoutInterface =
    qwertyGeorgianLayout as KeyboardLayoutInterface

  //console.log("here lad: ", qwertyGeorgianKeyboardLayout)

  const currentKeyboard = qwertyGeorgianKeyboardLayout.keyboard as KeyInterface[]

  const symbolsToHide = ["Minus", "Semicolon", "Period", "Comma", "Quote", "Slash"]

  // const keyboardWithoutLetters = currentKeyboard.map((key) => {
  //   if (key.type === "Letter" || symbolsToHide.includes(key.code)) {
  //     return {
  //       code: key.code,
  //       value: ["", ""],
  //       type: key.type,
  //     }
  //   } else {
  //     return key
  //   }
  // })

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
