import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"
import { KeyInterface } from "../../types/keyboard.types"

import Text from "./Text"
import Keyboard from "../Keyboard/Keyboard"

interface Props {
  text: string
  textLanguage?: "En" | "Geo"
  wordSeparator?: string
  handleTextFinish: () => void
  className?: string
  showKeyboard?: boolean
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const Typer = ({
  text,
  textLanguage = "En",
  wordSeparator = "",
  handleTextFinish,
  showKeyboard = true,
  className,
}: Props) => {
  const { keyboardLayout, keyboardLanguage } = useTypingSettingsStore()

  const textArray = text.split(" ")

  return (
    <div className="typer">
      <Text
        text={textArray}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
        className={className}
        keyboard={keyboardLayout[keyboardLanguage].keyboard as KeyInterface[]}
      />
      {showKeyboard ? (
        <Keyboard
          forcedLanguage={textLanguage}
          showSelectButton={false}
        />
      ) : null}
    </div>
  )
}
export default Typer
