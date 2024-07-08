import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import ExerciseCard from "./ExerciseCard"
import AssessmentCard from "./AssessmentCard"
import Tooltip from "../../components/Tooltip/Tooltip"

import LockIcon from "../../assets/icons/lock.svg?react"

interface Props {
  letters: string[]
  assessmentLevel: number
  isAvailable?: boolean
}

const ExerciseGroup = ({ letters, assessmentLevel, isAvailable = false }: Props) => {
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
        {letters.map((lett) =>
          isAvailable ? (
            <Link
              key={lett}
              to={`exercise/${lett}`}
            >
              <ExerciseCard letter={lett} />
            </Link>
          ) : (
            <p className="lesson-unclickable">
              <ExerciseCard
                key={lett}
                letter={lett}
              />
            </p>
          )
        )}
        {isAvailable ? (
          <Link
            to={`assessment/${assessmentLevel}`}
            className="assessment-link"
          >
            <AssessmentCard level={assessmentLevel} />
          </Link>
        ) : (
          <p className="assessment-unclickable">
            <AssessmentCard level={assessmentLevel} />
          </p>
        )}
      </div>
    </>
  )
}

export default ExerciseGroup
