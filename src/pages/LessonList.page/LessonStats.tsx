const LessonStats = () => {
  const handleScrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <div className="lesson-stats">
      <div className="lesson-stat-list">
        <div className="lesson-stat-list-buttons">
          <button
            onClick={() => {
              handleScrollToElement("Beginner")
            }}
            className="lesson-stat-list-button"
          >
            # Beginner <span>(0/0)</span>
          </button>
          <button
            onClick={() => {
              handleScrollToElement("Intermediate")
            }}
            className="lesson-stat-list-button"
          >
            # Intermediate <span>(0/0)</span>
          </button>
          <button
            onClick={() => {
              handleScrollToElement("Advanced")
            }}
            className="lesson-stat-list-button"
          >
            # Advanced <span>(0/0)</span>
          </button>
          <button
            onClick={() => {
              handleScrollToElement("Expert")
            }}
            className="lesson-stat-list-button"
          >
            # Expert <span>(0/0)</span>
          </button>
        </div>
      </div>
    </div>
  )
}
export default LessonStats
