import Text from "./Text"
import { useMemo } from "react"
import "../Typer/styles.scss"

interface Props {
  text: string
  wordSeparator?: string
  finishHandler?: (lettersStatuses: (0 | 1 | 2)[][], startTime: Date | null) => void
  ModifyMatch: (currentWordIndex: number) => void
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const TyperPlay = ({ text, wordSeparator = "", finishHandler = undefined, ModifyMatch }: Props) => {
  const memoizedTyper = useMemo(() => {
    return (
      <div className="typer">
        <div className="typing-panel">{/* <TextSettings /> */}</div>
        <Text
          text={text.split(" ")}
          wordSeparator={wordSeparator}
          finishHandler={finishHandler}
          ModifyMatch={ModifyMatch}
        />
      </div>
    )
  }, [])

  return memoizedTyper
}
export default TyperPlay
