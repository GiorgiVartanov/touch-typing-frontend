// import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
// import { TypingSettingsActions } from "../../store/reducers/typingSettingsReducers"

import Text from "./Text"
import TextSettings from "./TextSettings"

interface Props {
  text: string
}

const Typer = ({ text }: Props) => {
  const textArray = text.split(" ") // change it latter

  return (
    <div className="typing-component">
      <div className="typing-panel">
        <TextSettings />
      </div>
      <Text text={textArray} />
    </div>
  )
}
export default Typer
