import LessonStatItem from "./LessonStatItem"

const LessonStats = () => {
  // change it latter

  return (
    <div className="lesson-stats">
      <div className="lesson-stat-list">
        <div className="lesson-stat-list-buttons">
          <LessonStatItem
            name="Beginner"
            id="Beginner"
            finishedLessons={0}
            amountOfLessons={0}
          />
          <LessonStatItem
            name="Intermediate"
            id="Intermediate"
            finishedLessons={0}
            amountOfLessons={0}
          />
          <LessonStatItem
            name="Expert"
            id="Expert"
            finishedLessons={0}
            amountOfLessons={0}
          />
          <LessonStatItem
            name="Advanced"
            id="Advanced"
            finishedLessons={0}
            amountOfLessons={0}
          />
        </div>
      </div>
    </div>
  )
}
export default LessonStats
