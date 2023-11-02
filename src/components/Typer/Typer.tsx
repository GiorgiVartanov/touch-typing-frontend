// import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
// import { TypingSettingsActions } from "../../store/reducers/typingSettingsReducers"

import Text from "./Text"
import TextSettings from "./TextSettings"

interface Props {
  text: string
  wordSeparator?: string
}

const Typer = ({ text, wordSeparator = "" }: Props) => {
  const textArray = text.split(" ") // change it latter

  return (
    <div className="typing-component">
      <div className="typing-panel">
        <TextSettings />
      </div>
      <Text
        text={textArray}
        wordSeparator={wordSeparator}
      />
    </div>
  )
}
export default Typer
