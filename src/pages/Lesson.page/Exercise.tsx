import { useEffect, useState } from "react"
import TyperArea from "../../components/TypingArea/TypingArea"
import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"
import TypingArea from "../../components/TypingArea/TypingArea"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import PageLayout from "../../layout/Page.layout/Page.layout"

const Exercise = () => {
  const { letter } = useParams()

  const fetchLesson = async () => {
    if (!letter) return null

    return await ajax.get(`/lesson/exercise?letter=${letter}`)
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchLesson,
    queryKey: ["lesson", letter],
    staleTime: 10000000,
  })

  const renderExercise = () => {
    if (isLoading) return <Loading />

    if (error || !data?.data) return <div>something went wrong</div>

    return (
      <TypingArea
        text={data.data}
        textLanguage="Geo"
        handleTextFinish={() => {}}
      />
    )
  }

  return <PageLayout>{renderExercise()}</PageLayout>
}

export default Exercise
