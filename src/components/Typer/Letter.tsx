import { LetterStatus } from "../../types/typer.types/letterStatuses.types"

interface Props {
  letter: string
  isCurrentLetter: boolean
  isCorrect?: LetterStatus
}

const Letter = ({ letter, isCurrentLetter, isCorrect = LetterStatus.Inactive }: Props) => {
  const color = ["", "incorrect-letter", "correct-letter"][isCorrect]

  return (
    <span className={`letter ${color} ${isCurrentLetter ? "active-letter" : ""}`}>{letter}</span>
  )
}
export default Letter
