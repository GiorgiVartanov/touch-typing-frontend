import Text from "./Text"
import { useMemo, useState } from "react"
import "../Typer/styles.scss"

interface Props {
  text: string
  wordSeparator?: string
  handleTextFinish: (user_wpm: number) => void
  ModifyMatch: (currentWordIndex: number) => void
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const TyperPlay = ({ text, wordSeparator = "", handleTextFinish, ModifyMatch }: Props) => {
  const [show, setShow] = useState<Boolean>(true)
  const memoizedTyper = useMemo(() => {
    return (
      <div className="typer">
        <div className="typing-panel">{/* <TextSettings /> */}</div>
        <Text
          text={text.split(" ")}
          wordSeparator={wordSeparator}
          handleTextFinish={handleTextFinish}
          ModifyMatch={ModifyMatch}
          removeTextComponent={() => setShow(false)}
        />
      </div>
    )
  }, [])

  if (show) return memoizedTyper
  else return <></>
}
export default TyperPlay
