import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

import "./styles.scss"

import { LessonType } from "../../types/lesson.types"
import ajax from "../../services/ajax"

import Typer from "../../components/Typer/Typer"
import Loading from "../../components/Loading/Loading"

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

  if (isLoading || !data) return <Loading />

  const { title, description, level, text, wordSeparator } = data

  return (
    <div className="page lesson-page">
      <div className="description">
        <h2>
          {title}
          <Link to={`../learn/${level}`}>
            <span>{level}</span>
          </Link>
        </h2>
        <p>{description}</p>
      </div>
      <Typer
        text={text}
        wordSeparator={wordSeparator}
      />
    </div>
  )
}
export default LessonPage
