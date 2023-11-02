interface Props {
  name: string
  isInView: boolean
  finishedLessons: number
  amountOfLessons: number
  onClick: (id: string) => void
}

const LessonStatItem = ({ name, isInView, finishedLessons, amountOfLessons, onClick }: Props) => {
  return (
    <button
      onClick={() => {
        onClick(name)
      }}
      className={`lesson-stat-list-button ${isInView ? "active" : ""}`}
    >
      <span className="lesson-tag">#</span> {name}{" "}
      <span className="lessons-amount">
        ({finishedLessons}/{amountOfLessons})
      </span>
    </button>
  )
}
export default LessonStatItem
