import Letter from "./Letter"

interface Props {
  word: string
  correctLetters?: (0 | 1 | 2)[]
  style?: React.CSSProperties
}

const Word = ({ word, correctLetters, style }: Props) => {
  return (
    <div
      style={style}
      className="word"
    >
      {word.split("").map((letter, index) => (
        <Letter
          key={index}
          letter={letter}
          isCurrentLetter={false}
          isCorrect={correctLetters?.[index]}
        />
      ))}
    </div>
  )
}
export default Word
