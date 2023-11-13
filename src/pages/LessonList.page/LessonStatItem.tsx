interface Props {
  name: string
  isInView: boolean
  finishedLessons: number
  amountOfLessons: number
  onClick: (id: string) => void
}

// shows name (difficulty) with amount of its lessons and current user's completed lessons in this section
// if amount of lessons is 0 it will be inactive
const LessonStatItem = ({ name, isInView, finishedLessons, amountOfLessons, onClick }: Props) => {
  return (
    <button
      onClick={() => {
        onClick(name)
      }}
      className={`lesson-stat-list-button ${isInView ? "active" : ""} ${
        amountOfLessons === 0 ? "empty" : ""
      }`}
    >
      <span className="lesson-tag">#</span>
      <span className="lesson-name">{name}</span>
      <span className="lessons-amount">
        ({finishedLessons}/{amountOfLessons})
      </span>
    </button>
  )
}
export default LessonStatItem
