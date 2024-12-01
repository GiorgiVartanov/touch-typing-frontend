import { Link } from "react-router-dom"

interface Props {
  letter: string
  isAvailable: boolean
  isCompleted: boolean
}

const ExerciseCard = ({ letter, isAvailable, isCompleted }: Props) => {
  return (
    <Link
      to={`exercise/${letter}`}
      className={`${isAvailable ? "exercise-available" : "exercise-unavailable"}`}
    >
      <div className={`exercise-card ${isCompleted ? "exercise-completed" : ""} `}>{letter}</div>
    </Link>
  )
}

export default ExerciseCard
