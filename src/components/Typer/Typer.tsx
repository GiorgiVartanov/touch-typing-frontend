import "./styles.scss"

import Text from "./Text"
// import TextSettings from "./TextSettings"

interface Props {
  text: string
  wordSeparator?: string
  finishHandler?: (lettersStatuses:(0 | 1 | 2)[][], startTime : Date | null) => void
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const Typer = ({ text, wordSeparator = "", finishHandler = undefined }: Props) => {
  const textArray = text.split(" ") // change it latter

  return (
    <div className="typer">
      <div className="typing-panel">{/* <TextSettings /> */}</div>
      <Text
        text={textArray}
        wordSeparator={wordSeparator}
        finishHandler={finishHandler}
      />
    </div>
  )
}
export default Typer
