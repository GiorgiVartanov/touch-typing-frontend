import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"
import { KeyInterface } from "../../types/keyboard.types"

import Text from "./Text"
import Keyboard from "../Keyboard/Keyboard"
// import TextSettings from "./TextSettings"

import { keyboard as qwertyLayout } from "../../keyboardLayouts/qwerty.json"
import { keyboard as qwertyGeorgianLayout } from "../../keyboardLayouts/geo.json"
import { keyboard as dvorakLayout } from "../../keyboardLayouts/dvorak.json"
import { keyboard as colemakLayout } from "../../keyboardLayouts/colemak.json"
import { keyboard as workmanLayout } from "../../keyboardLayouts/workman.json"

interface Props {
  text: string
  wordSeparator?: string
  handleTextFinish: () => void
  className?: string
  showKeyboard?: boolean
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const Typer = ({
  text,
  wordSeparator = "",
  handleTextFinish,
  showKeyboard = true,
  className,
}: Props) => {
  const { keyboardLayout } = useTypingSettingsStore()

  const textArray = text.split(" ")

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

  return (
    <div className="typer">
      <Text
        text={textArray}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
        className={className}
        keyboard={currentKeyboard as KeyInterface[]}
      />
      {showKeyboard ? <Keyboard keyboard={currentKeyboard as KeyInterface[]} /> : null}
    </div>
  )
}
export default Typer
