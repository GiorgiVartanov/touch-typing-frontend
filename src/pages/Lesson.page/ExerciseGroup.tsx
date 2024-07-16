import { useTranslation } from "react-i18next"

import ExerciseCard from "./ExerciseCard"
import AssessmentCard from "./AssessmentCard"
import Tooltip from "../../components/Tooltip/Tooltip"

import LockIcon from "../../assets/icons/lock.svg?react"

interface Props {
  letters: string[]
  assessmentLevel: number
  isAvailable?: boolean
  completedLessons?: string[]
  completedAssessments?: number[]
}

const ExerciseGroup = ({
  letters,
  assessmentLevel,
  isAvailable = false,
  completedLessons = [],
  completedAssessments = [],
}: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  return (
    <>
      <h3 className={`lesson-group-header ${isAvailable ? "" : "lessons-available"}`}>
        {t("Lesson texts for the letters")}
        <span>
          {letters[0]} - {letters[letters.length - 1]}
        </span>
      </h3>
      <div className="row">
        {isAvailable ? (
          ""
        ) : (
          <div className="lock">
            <Tooltip
              className="icon-holder"
              tooltipContent={t("complete previous assessment to unlock")}
              tooltipPosition="bottom-center"
            >
              <LockIcon className="icon" />
            </Tooltip>

            <div className="lock-background"></div>
          </div>
        )}
        {letters.map((letter, index) => (
          <ExerciseCard
            key={letter}
            letter={letter}
            isAvailable={
              isAvailable &&
              (completedLessons.includes(letters[index - 1]) ||
                [0, 6, 12, 18, 23, 28, 33].includes(index))
            }
            isCompleted={completedLessons.includes(letter)}
          />
        ))}
        <AssessmentCard
          level={assessmentLevel}
          isAvailable={isAvailable && letters.every((letter) => completedLessons.includes(letter))}
          isCompleted={completedAssessments.includes(assessmentLevel)}
        />
      </div>
    </>
  )
}

export default ExerciseGroup
