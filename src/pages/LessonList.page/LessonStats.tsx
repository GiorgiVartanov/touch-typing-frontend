import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { DifficultyLevelType } from "../../types/lesson.types"

import LessonStatItem from "./LessonStatItem"

interface Props {
  lessonsAmount: {
    Beginner: number
    Intermediate: number
    Advanced: number
    Expert: number
  }
}

// renders list of lesson stats (amount of lessons in a difficulty)
const LessonStats = ({ lessonsAmount }: Props) => {
  const calculateFirstLevel = () => {
    // returns difficulty of a first level, so it will be set to active immediately

    if (lessonsAmount.Beginner > 0) return "Beginner"
    if (lessonsAmount.Intermediate > 0) return "Intermediate"
    if (lessonsAmount.Advanced > 0) return "Advanced"
    if (lessonsAmount.Expert > 0) return "Expert"

    return "Beginner"
  }

  // currently active (visible) difficulty
  const [currentView, setCurrentView] = useState<DifficultyLevelType>(calculateFirstLevel)

  // checks which element is currently in view
  const checkViewport = () => {
    const elements = [
      { name: "Beginner", element: document.getElementById("Beginner") },
      { name: "Intermediate", element: document.getElementById("Intermediate") },
      { name: "Advanced", element: document.getElementById("Advanced") },
      { name: "Expert", element: document.getElementById("Expert") },
    ]

    const elementInView = elements.find((element) => {
      if (element?.element) {
        const rect = element.element.getBoundingClientRect()
        return (
          rect.top <= window.innerHeight - 140 &&
          rect.bottom >= 140 &&
          rect.left <= window.innerWidth &&
          rect.right >= 0
        )
      }
      return false
    })

    if (!elementInView) return false

    const elementId = elementInView.name as DifficultyLevelType

    setCurrentView(elementId)
  }

  // scrolls to the element with a passed id
  const handleScrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // listens to scroll, runs checkViewport() when user scrolls
  useEffect(() => {
    checkViewport()

    window.addEventListener("scroll", checkViewport)

    return () => {
      window.removeEventListener("scroll", checkViewport)
    }
  }, [])

  return (
    <div className="lesson-stats">
      <div className="lesson-stat-list">
        <div className="lesson-stat-list-buttons">
          <LessonStatItem
            name="Beginner"
            isInView={currentView === "Beginner"}
            finishedLessons={0}
            amountOfLessons={lessonsAmount.Beginner}
            onClick={handleScrollToElement}
          />
          <LessonStatItem
            name="Intermediate"
            isInView={currentView === "Intermediate"}
            finishedLessons={0}
            amountOfLessons={lessonsAmount.Intermediate}
            onClick={handleScrollToElement}
          />
          <LessonStatItem
            name="Expert"
            isInView={currentView === "Expert"}
            finishedLessons={0}
            amountOfLessons={lessonsAmount.Expert}
            onClick={handleScrollToElement}
          />
          <LessonStatItem
            name="Advanced"
            isInView={currentView === "Advanced"}
            finishedLessons={0}
            amountOfLessons={lessonsAmount.Advanced}
            onClick={handleScrollToElement}
          />
          <Link to="../fake">fake words (will be moved somewhere else)</Link>
          <Link to="../incremental">incremental learning(first draft)</Link>
        </div>
      </div>
    </div>
  )
}
export default LessonStats
