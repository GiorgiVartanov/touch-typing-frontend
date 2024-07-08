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
import { MetricsProvider } from "../../store/context/MetricsContext"
import { MetricsContextProps } from "../../types/typer.types/Metrics.types"
import calculateAccuracy from "../../util/TypingStats/calculateAccuracy"
import calculateTime from "../../util/TypingStats/calculateTime"

const Assessment = () => {
  const { assessmentLevel } = useParams()

  const { token, saveAssessmentLocally } = useAuthStore()

  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  const fetchAssessment = async () => {
    if (!assessmentLevel) return

    return await ajax.get(`/lesson/assessment?assessment_level=${assessmentLevel}`)
  }

  const completeAssessment = (metrics: MetricsContextProps) => {
    if (!token) {
      toast.warning(t("you need to be logged in to save assessment results"))
    }

    console.log(metrics)

    if (!assessmentLevel || !token) return

    // check percentage here, return if its less than desired
    // const accuracy = calculateAccuracy(metrics.correctPressCount, metrics.incorrectPressCount)
    // const time =
    //   metrics.keyPressTimestamps[metrics.keyPressCount - 1] - metrics.keyPressTimestamps[0]

    // if (accuracy < 80) {
    //   toast.warning("You have to get more than 80% accuracy to unlock the next level.")
    //   return
    // }

    // if (time > metrics.keyPressTimestamps.length) {
    //   toast.warning(
    //     `You have to use 1 second per character on average to unlock the next level\nYou have to fit in ${metrics.keyPressTimestamps.length} seconds`
    //   )
    //   return
    // }

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
      <MetricsProvider>
        <TypingArea
          text={data.data}
          textLanguage="Geo"
          handleTextFinish={completeAssessment}
          displayResultsAfterFinish={true}
        />
      </MetricsProvider>
    )
  }

  return <PageLayout>{renderAssessment()}</PageLayout>
}

export default Assessment
