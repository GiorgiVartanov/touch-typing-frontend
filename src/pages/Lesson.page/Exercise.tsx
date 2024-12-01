import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"
import TypingArea from "../../components/TypingArea/TypingArea"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import PageLayout from "../../layout/Page.layout/Page.layout"
import { useAuthStore } from "../../store/context/authContext"
import { toast } from "react-toastify"
import { saveLesson } from "../../services/lessonServices"
import { useTranslation } from "react-i18next"
import calculateAccuracy from "../../util/TypingStats/calculateAccuracy"
import { MetricsContextProps } from "../../types/typer.types/Metrics.types"
import { useNavigate } from "react-router-dom"

const assessmentLessonRequirements = [
  ["ა", "ი", "ს", "რ", "მ", "ლ"],
  ["ე", "ნ", "დ", "ბ", "ვ", "თ"],
  ["ო", "გ", "ტ", "შ", "ხ", "კ"],
  ["უ", "ც", "ქ", "ზ", "წ"],
  ["ფ", "პ", "ყ", "ღ", "ძ"],
  ["ჩ", "ჯ", "ჭ", "ჰ", "ჟ"],
]

const preAssessmentLessons = ["ლ", "თ", "კ", "წ", "ძ", "ჟ"]

const Exercise = () => {
  const navigate = useNavigate()

  const { letter } = useParams()

  const { token, saveLessonLocally, user } = useAuthStore()

  const completedLessons = user?.completedLessons
  const completedAssessments = user?.completedAssessments

  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  const checkCompletedLetters = () => {
    if (!letter) return false

    if (letter === "ა") return true

    if (letter === "ე" && !completedAssessments?.includes(1)) return false
    if (letter === "ო" && !completedAssessments?.includes(2)) return false
    if (letter === "უ" && !completedAssessments?.includes(3)) return false
    if (letter === "ფ" && !completedAssessments?.includes(4)) return false
    if (letter === "ჩ" && !completedAssessments?.includes(5)) return false

    return assessmentLessonRequirements
      .map((subArray) => {
        const index = subArray.indexOf(letter)

        if (index !== -1) {
          return subArray
            .slice(0, index)
            .every((completedLetter) => completedLessons?.includes(completedLetter))
        }
        return true
      })
      .every((result) => result)
  }

  const fetchLesson = async () => {
    if (!letter) return null

    return await ajax.get(`/lesson/exercise?letter=${letter}`)
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchLesson,
    queryKey: ["lesson", letter],
    staleTime: 10000000,
  })

  if (!checkCompletedLetters()) {
    navigate("../lessons")
    toast.warning(t("you don't have access to this lesson"))

    return
  }

  const getNextLevelURL = () => {
    if (!letter) return "../lessons"

    if (preAssessmentLessons.includes(letter)) {
      const assessmentLevel = preAssessmentLessons.indexOf(letter) + 1 // +1 because assessment levels start from 1
      return `../lessons/assessment/${assessmentLevel}`
    } else {
      const nextLetter = getNextLetter(letter)
      return `../lessons/exercise/${nextLetter}`
    }

    function getNextLetter(currentLetter: string) {
      let found = false
      for (let i = 0; i < assessmentLessonRequirements.length; i++) {
        for (let j = 0; j < assessmentLessonRequirements[i].length; j++) {
          if (found) {
            return assessmentLessonRequirements[i][j]
          }
          if (assessmentLessonRequirements[i][j] === currentLetter) {
            found = true
          }
        }
      }

      return "../lessons"
    }
  }

  const completeLesson = (metrics: MetricsContextProps) => {
    if (!token) {
      toast.warning(t("you need to be logged in to save assessment results"))

      return
    }
    if (!letter) return

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

    saveLessonLocally(letter)

    return saveLesson(0, letter, token)
  }

  const renderExercise = () => {
    if (isLoading) return <Loading />

    if (error || !data?.data) return <div>{t("something went wrong")}</div>

    return (
      <TypingArea
        text={data.data}
        textLanguage="Geo"
        handleSetMetrics={completeLesson}
        displayResultsAfterFinish={true}
        showGoToNextLevel={true}
        nextLevelURL={getNextLevelURL()}
        accuracyToComplete={80}
      />
    )
  }

  return <PageLayout className="exercise-page">{renderExercise()}</PageLayout>
}

export default Exercise
