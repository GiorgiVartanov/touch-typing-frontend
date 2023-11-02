interface Props {
  name: string
  isInView: boolean
  finishedLessons: number
  amountOfLessons: number
  onClick: (id: string) => void
}

const LessonStatItem = ({ name, isInView, finishedLessons, amountOfLessons }: Props) => {
  return (
    <button className={`lesson-stat-list-button ${isInView ? "active" : ""}`}>
      # {name}{" "}
      <span>
        ({finishedLessons}/{amountOfLessons})
      </span>
    </button>
  )
}
export default LessonStatItem
