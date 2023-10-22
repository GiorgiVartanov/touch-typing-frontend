import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import "./styles.scss"

import { LessonType } from "../../types/lesson.types"
import ajax from "../../services/ajax"

import Text from "../../components/Typer/Text"

const LessonPage = () => {
  const { id } = useParams()

  const [data, setData] = useState<LessonType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchLesson = async () => {
      const response = await ajax.get(`/lesson/${id}`)

      setData(response.data)
    }
    fetchLesson()

    setIsLoading(false)
  }, [id])

  if (isLoading || !data) return <div>Loading...</div>

  const { title, description, level, text } = data

  return (
    <div className="page lesson-page">
      <div className="description">
        <h2>
          {title} <span>{level}</span>
        </h2>
        <p>{description}</p>
      </div>
      <Text text={text} />
    </div>
  )
}
export default LessonPage
