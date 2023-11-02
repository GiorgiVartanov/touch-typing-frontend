import { useState, useEffect } from "react"

import { DifficultyLevelType } from "../../types/lesson.types"

import LessonStatItem from "./LessonStatItem"

const LessonStats = () => {
  const [currentView, setCurrentView] = useState<DifficultyLevelType>("none")

  const checkViewport = () => {
    const elements = [
      { name: "Beginner", element: document.getElementById("Beginner") },
      { name: "Intermediate", element: document.getElementById("Intermediate") },
      { name: "Advanced", element: document.getElementById("Advanced") },
      { name: "Expert", element: document.getElementById("Expert") },
    ]

    const elementInViewElement = elements.find((element) => {
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

    if (!elementInViewElement) return false

    const elementId = elementInViewElement.name as DifficultyLevelType

    setCurrentView(elementId)

    // const element = document.getElementById(id)
    // if (element) {
    //   const rect = element.getBoundingClientRect()
    //   setIsInView(
    //     rect.top <= window.innerHeight - 140 &&
    //       rect.bottom >= 140 &&
    //       rect.left <= window.innerWidth &&
    //       rect.right >= 0
    //   )
    // }
  }

  const handleScrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
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
            amountOfLessons={0}
            onClick={handleScrollToElement}
          />
          <LessonStatItem
            name="Intermediate"
            isInView={currentView === "Intermediate"}
            finishedLessons={0}
            amountOfLessons={0}
            onClick={handleScrollToElement}
          />
          <LessonStatItem
            name="Expert"
            isInView={currentView === "Expert"}
            finishedLessons={0}
            amountOfLessons={0}
            onClick={handleScrollToElement}
          />
          <LessonStatItem
            name="Advanced"
            isInView={currentView === "Advanced"}
            finishedLessons={0}
            amountOfLessons={0}
            onClick={handleScrollToElement}
          />
        </div>
      </div>
    </div>
  )
}
export default LessonStats
