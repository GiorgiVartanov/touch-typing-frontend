import Text from "./Text"
import { useMemo, useState } from "react"
import "../Typer/styles.scss"
import Keyboard from "../Keyboard/Keyboard"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import { KeyInterface } from "../../types/keyboard.types"

interface Props {
  text: string
  wordSeparator?: string
  handleTextFinish: (user_wpm: number) => void
  ModifyMatch: (currentWordIndex: number) => void
}

// renders typing settings
// renders Text with the passed word separator (thing between words, usually space but any string may be passed)
const TyperPlay = ({ text, wordSeparator = "", handleTextFinish, ModifyMatch }: Props) => {
  const { keyboardLayout, keyboardLanguage } = useTypingSettingsStore()

  const [show, setShow] = useState<boolean>(true)
  const memoizedTyper = useMemo(() => {
    return (
      <div className="typer">
        <Text
          text={text.split(" ")}
          wordSeparator={wordSeparator}
          handleTextFinish={handleTextFinish}
          ModifyMatch={ModifyMatch}
          removeTextComponent={() => setShow(false)}
          keyboard={keyboardLayout[keyboardLanguage].keyboard as KeyInterface[]}
        />
        <Keyboard forcedLanguage={"Geo"} />
      </div>
    )
  }, [])

  if (show) return memoizedTyper
  else return <></>
}
export default TyperPlay
