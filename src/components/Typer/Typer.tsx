import "./styles.scss"

import Text from "./Text"
// import TextSettings from "./TextSettings"

interface Props {
  text: string
  wordSeparator?: string
  handleTextFinish: () => void
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const Typer = ({ text, wordSeparator = "", handleTextFinish }: Props) => {
  const textArray = text.split(" ") // change it latter

  return (
    <div className="typer">
      <div className="typing-panel">{/* <TextSettings /> */}</div>
      <Text
        text={textArray}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
      />
    </div>
  )
}
export default Typer
