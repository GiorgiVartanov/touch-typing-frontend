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
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const afterAssessmentLetters = ["ე", "ო", "უ", "ფ", "ჩ"]

const Assessment = () => {
  const navigate = useNavigate()

  const { assessmentLevel } = useParams()

  const { token, saveAssessmentLocally, user } = useAuthStore()

  const completedLessons = user?.completedLessons

  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  const fetchAssessment = async () => {
    if (!assessmentLevel) return

    return await ajax.get(`/lesson/assessment?assessment_level=${assessmentLevel}`)
  }

  const completeAssessment = (metrics: MetricsContextProps) => {
    if (!token) {
      toast.warning(t("you need to be logged in to save assessment results"))

      return
    }

    if (!assessmentLevel) return

    const accuracy = calculateAccuracy(
      metrics.letterStatuses.reduce((accumulator: number, item) => {
        accumulator += item.reduce((acc, item2) => {
          if (item2 === 2) return acc + 1
          else return acc
        }, 0)
        return accumulator
      }, metrics.letterStatuses.length as number),
      metrics.letterStatuses.reduce((accumulator: number, item) => {
        accumulator += item.reduce((acc, item2) => {
          if (item2 === 1) return acc + 1
          else return acc
        }, 0)
        return accumulator
      }, metrics.letterStatuses.length as number)
    )

    const time =
      metrics.keyPressTimestamps[metrics.keyPressCount - 1] - metrics.keyPressTimestamps[0]

    console.log({ accuracy, time })

    if (accuracy < 80) {
      toast.warning(t("You have to get more than 80% accuracy to unlock the next level."))
      return
    }

    if (
      time / 1000 >
      metrics.letterStatuses.reduce((accumulator, item) => {
        accumulator += item.length
        return accumulator
      }, metrics.letterStatuses.length - 1)
    ) {
      toast.warning(
        t(
          "You have to use 1 second per character on average to unlock the next level\nYou have to fit in"
        ) +
          " " +
          String(
            metrics.letterStatuses.reduce((accumulator, item) => {
              accumulator += item.length
              return accumulator
            }, metrics.letterStatuses.length - 1)
          ) +
          " " +
          t("seconds")
      )
      return
    }

    saveAssessmentLocally(Number(assessmentLevel))

    return saveAssessment(0, Number(assessmentLevel), token)
  }

  const checkCompletedLetters = () => {
    if (!assessmentLevel) return false

    if (![1, 2, 3, 4, 5, 6].includes(Number(assessmentLevel))) return false

    if (Number(assessmentLevel) === 1 && user?.completedLessons.includes("ლ")) return true

    if (
      Number(assessmentLevel) === 2 &&
      user?.completedAssessments.includes(1) &&
      user?.completedLessons.includes("თ")
    )
      return true

    if (
      Number(assessmentLevel) === 3 &&
      user?.completedAssessments.includes(2) &&
      user?.completedLessons.includes("კ")
    )
      return true

    if (
      Number(assessmentLevel) === 4 &&
      user?.completedAssessments.includes(3) &&
      user?.completedLessons.includes("წ")
    )
      return true

    if (
      Number(assessmentLevel) === 5 &&
      user?.completedAssessments.includes(4) &&
      user?.completedLessons.includes("ძ")
    )
      return true

    if (
      Number(assessmentLevel) === 6 &&
      user?.completedAssessments.includes(5) &&
      user?.completedLessons.includes("ჟ")
    )
      return true

    return false
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchAssessment,
    queryKey: ["assessment", assessmentLevel],
    staleTime: 10000000,
  })

  if (!checkCompletedLetters()) {
    navigate("../lessons")
    toast.warning(t("you don't have access to this lesson"))

    return
  }

  const getNextLevelURL = () => {
    if (!assessmentLevel) return "../lessons"

    const levelIndex = Number(assessmentLevel) - 1

    if (levelIndex < afterAssessmentLetters.length) {
      return `../lessons/exercise/${afterAssessmentLetters[levelIndex]}`
    } else {
      return "../lessons"
    }
  }

  const renderAssessment = () => {
    if (isLoading) return <Loading />

    if (error || !data?.data) return <div>{t("something went wrong")}</div>

    return (
      // <MetricsProvider>
      <TypingArea
        text={data.data}
        textLanguage="Geo"
        // handleTextFinish={completeAssessment}
        handleSetMetrics={completeAssessment}
        displayResultsAfterFinish={true}
        showGoToNextLevel={true}
        nextLevelURL={getNextLevelURL()}
        isLastAssessment={typeof assessmentLevel === "number" && assessmentLevel === 6}
        accuracyToComplete={80}
      />
      //{/* </MetricsProvider> */}
    )
  }

  return <PageLayout className="exercise-page">{renderAssessment()}</PageLayout>
}

export default Assessment
