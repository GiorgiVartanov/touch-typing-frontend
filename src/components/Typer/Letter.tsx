interface Props {
  letter: string
  isCurrentLetter: boolean
  isLastLetter: boolean
  isCorrect?: 0 | 1 | 2
}

const Letter = ({ letter, isCurrentLetter, isLastLetter, isCorrect = 0 }: Props) => {
  const color = ["", "incorrect-letter", "correct-letter"][isCorrect]

  return (
    <span
      className={`letter ${isLastLetter ? "last-letter" : ""} ${color} ${
        isCurrentLetter ? "active-letter" : ""
      }`}
    >
      {letter}
    </span>
  )
}
export default Letter
