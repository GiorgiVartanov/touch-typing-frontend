import { useState, useEffect } from "react"

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

const LessonStats = ({ lessonsAmount }: Props) => {
  const calculateFirstLevel = () => {
    // returns difficulty of a first level

    if (lessonsAmount.Beginner > 0) return "Beginner"
    if (lessonsAmount.Intermediate > 0) return "Intermediate"
    if (lessonsAmount.Advanced > 0) return "Advanced"
    if (lessonsAmount.Expert > 0) return "Expert"

    return "Beginner"
  }

  const [currentView, setCurrentView] = useState<DifficultyLevelType>(calculateFirstLevel)

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

  const handleScrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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
        </div>
      </div>
    </div>
  )
}
export default LessonStats
