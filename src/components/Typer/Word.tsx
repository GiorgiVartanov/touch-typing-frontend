import { useMemo } from "react"

import Letter from "./Letter"

interface Props {
  word: string
  correctLetters?: (0 | 1 | 2)[]
  wordSeparator: string
  style?: React.CSSProperties
}

// renders a word
// it uses useMemo, so it's rerendered only when any of its props are changed (actually it is rerendered when it's parent rerenders. calculations (list of Letter components) are cached, so next time they will get rendered faster )
const Word = ({ word, correctLetters, wordSeparator, style }: Props) => {
  const memoizedWord = useMemo(() => {
    return (
      <div
        style={style}
        className="word"
      >
        {[...word.split(""), "\u00a0" + wordSeparator + "\u00a0"].map((letter, index) => (
          <Letter
            key={index}
            letter={letter}
            isCurrentLetter={false}
            isCorrect={correctLetters?.[index]}
          />
        ))}
      </div>
    )
  }, [word, correctLetters, wordSeparator, style])

  return memoizedWord
}
export default Word
