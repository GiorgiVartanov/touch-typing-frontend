import TyperPlay from "../TyperPlay/TyperPlay"
import { MetricsProvider } from "../../store/context/MetricsContext"

interface Props {
  text: string
  wordSeparator?: string
  handleTextFinish: (user_wpm: number) => void
  ModifyMatch: (currentWordIndex: number) => void
}

const TypingAreaDisplay = ({ text, wordSeparator, ModifyMatch, handleTextFinish }: Props) => {
  return (
    <MetricsProvider>
      <div className="TypingArea">
        <TyperPlay
          text={text}
          wordSeparator={wordSeparator}
          handleTextFinish={handleTextFinish}
          ModifyMatch={ModifyMatch}
        />
      </div>
    </MetricsProvider>
  )
}

const TypingAreaPlay = ({ text, wordSeparator, handleTextFinish, ModifyMatch }: Props) => {
  return (
    <MetricsProvider>
      <TypingAreaDisplay
        text={text}
        wordSeparator={wordSeparator}
        handleTextFinish={handleTextFinish}
        ModifyMatch={ModifyMatch}
      />
    </MetricsProvider>
  )
}

export default TypingAreaPlay
