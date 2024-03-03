import { useParams, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import "./styles.scss"

import { Text } from "../../types/practiceText.types"
import { getPracticeText } from "../../services/practiceText"

import Typer from "../../components/Typer/Typer"
import Loading from "../../components/Loading/Loading"

// page
const PracticeTextPage = () => {
  const { id } = useParams()

  const fetchText = async (): Promise<{ data: Text } | null> => {
    if (!id) return null

    return await getPracticeText(id)
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchText,
    queryKey: ["practice text", id],
  })

  if (isLoading || !data) return <Loading />

  if (error || !data.data) {
    console.log(error?.message || "something went wrong")

    return <div>{error?.message || "something went wrong"}</div>
  }

  const { title, description, level, text, wordSeparator } = data.data

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
export default PracticeTextPage
