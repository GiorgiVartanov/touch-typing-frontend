import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import "./styles.scss"
import { KeyboardLanguageType } from "../../types/typer.types/typingSettings.types"

import Text from "./Text"
import Keyboard from "../Keyboard/Keyboard"
import { MetricsContextProps } from "../../types/typer.types/Metrics.types"

interface Props {
  text: string
  textLanguage?: KeyboardLanguageType
  wordSeparator?: string
  handleTextFinish?: () => void
  handleSetMetrics?: (metrics: MetricsContextProps) => void
  className?: string
  showKeyboard?: boolean
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const Typer = ({
  text,
  textLanguage = "Eng",
  wordSeparator = "",
  handleTextFinish,
  handleSetMetrics,
  showKeyboard = true,
  className,
}: Props) => {
  const { keyboardLayout } = useTypingSettingsStore()

  const textArray = text.split(" ")

  // show toast that says that keyboard language for this text was changed. it will pop up if keyboardLanguage !== textLanguage

  return (
    <div className="typer">
      <Text
        text={textArray}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
        handleSetMetrics={handleSetMetrics}
        className={className}
        keyboard={keyboardLayout[textLanguage].keyboard}
      />
      <Keyboard
        showKeyboard={showKeyboard}
        forcedLanguage={textLanguage}
        showSelectButton={false}
        showEditButton={false}
        showLanguageSelector={false}
        showHideKeyboardButton={true}
        showKeyboardTypeSelector={true}
        showUtilityButtons={false}
      />
    </div>
  )
}
export default Typer
