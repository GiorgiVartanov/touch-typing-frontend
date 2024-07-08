import TypingArea from "../../components/TypingArea/TypingArea"
import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import PageLayout from "../../layout/Page.layout/Page.layout"
import { useAuthStore } from "../../store/context/authContext"
import { saveAssessment } from "../../services/lessonServices"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

const Assessment = () => {
  const { assessmentLevel } = useParams()

  const { token, saveAssessmentLocally } = useAuthStore()

  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  const fetchAssessment = async () => {
    if (!assessmentLevel) return

    return await ajax.get(`/lesson/assessment?assessment_level=${assessmentLevel}`)
  }

  const completeAssessment = () => {
    if (!token) {
      toast.warning(t("you need to be logged in to save assessment results"))
    }

    if (!assessmentLevel || !token) return

    // check percentage here, return if its less than desired

    saveAssessmentLocally(Number(assessmentLevel))

    return saveAssessment(0, Number(assessmentLevel), token)
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
