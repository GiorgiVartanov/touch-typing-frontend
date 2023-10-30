import { useState, useEffect } from "react"

interface Props {
  name: string
  id: string
  finishedLessons: number
  amountOfLessons: number
}

const LessonStatItem = ({ name, id, finishedLessons, amountOfLessons }: Props) => {
  const [isInView, setIsInView] = useState<boolean>(false)

  const checkViewport = () => {
    const element = document.getElementById(id)
    if (element) {
      const rect = element.getBoundingClientRect()
      setIsInView(
        rect.top <= window.innerHeight - 140 &&
          rect.bottom >= 140 &&
          rect.left <= window.innerWidth &&
          rect.right >= 0
      )
    }
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
    <button
      onClick={() => {
        handleScrollToElement(id)
      }}
      className={`lesson-stat-list-button ${isInView ? "active" : ""}`}
    >
      # {name}{" "}
      <span>
        ({finishedLessons}/{amountOfLessons})
      </span>
    </button>
  )
}
export default LessonStatItem
