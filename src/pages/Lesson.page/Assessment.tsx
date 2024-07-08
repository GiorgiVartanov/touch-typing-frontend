import { useEffect, useState } from "react"
import TypingArea from "../../components/TypingArea/TypingArea"
import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import PageLayout from "../../layout/Page.layout/Page.layout"
import { useAuthStore } from "../../store/context/authContext"
import { saveAssessment } from "../../services/lessonServices"
import { toast } from "react-toastify"

const Assessment = () => {
  const { assessmentLevel } = useParams()

  const { token } = useAuthStore()

  const fetchAssessment = async () => {
    if (!assessmentLevel) return

    return await ajax.get(`/lesson/assessment?assessment_level=${assessmentLevel}`)
  }

  const completeAssessment = () => {
    if (!token) {
      toast.warning("you need to be logged in to save assessment results")
    }

    if (!assessmentLevel || !token) return

    return saveAssessment(0, assessmentLevel, token)
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchAssessment,
    queryKey: ["assessment", assessmentLevel],
    staleTime: 10000000,
  })

  const renderAssessment = () => {
    if (isLoading) return <Loading />

    if (error || !data?.data) return <div>something went wrong</div>

    return (
      <TypingArea
        text={data.data}
        textLanguage="Geo"
        handleTextFinish={completeAssessment}
        displayResultsAfterFinish={true}
      />
    )
  }

  return <PageLayout>{renderAssessment()}</PageLayout>
}

export default Assessment
