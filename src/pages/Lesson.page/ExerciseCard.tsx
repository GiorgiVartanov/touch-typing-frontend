interface Props {
  letter: string
}

const ExerciseCard = ({ letter }: Props) => {
  return <p>lesson: {letter}</p>
}

export default ExerciseCard
