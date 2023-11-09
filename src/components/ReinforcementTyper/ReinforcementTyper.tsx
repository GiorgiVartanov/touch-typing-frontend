import TextSettings from "../Typer/TextSettings"
import "../Typer/styles.scss"

import Text from "./Text"

interface Props {
  text: string
  wordSeparator?: string
}

// User types words and if a mistake is made the incorrect word is queued for a second attempt
const ReinforcementTyper = ({ text, wordSeparator = "" }: Props) => {
  const textArray = text.split(" ")
  
  return (
    <div className="typer">
      <div className="typing-panel">
        <TextSettings />
      </div>
      <Text
        words={textArray}
        wordSeparator={wordSeparator}
      />
    </div>
  )
}

export default ReinforcementTyper;
