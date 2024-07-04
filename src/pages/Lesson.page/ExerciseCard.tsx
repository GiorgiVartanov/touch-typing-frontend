interface Props {
  letter: string
}

const ExerciseCard = ({ letter }: Props) => {
  return <div className="exercise-card">{letter}</div>
}

export default ExerciseCard
