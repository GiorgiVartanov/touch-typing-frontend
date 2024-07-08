import { Link } from "react-router-dom"

import ExerciseCard from "./ExerciseCard"
import AssessmentCard from "./AssessmentCard"

interface Props {
  letters: string[]
  assessmentLevel: number
  isAvailable?: boolean
}

const ExerciseGroup = ({ letters, assessmentLevel, isAvailable = false }: Props) => {
  return (
    <>
      <h3 className="lesson-group-header">
        Lesson texts for the letters
        <span>
          {letters[0]} - {letters[letters.length - 1]}
        </span>
      </h3>
      <div className="row">
        {isAvailable ? (
          ""
        ) : (
          <div className="lock">please, complete previous assessment to unlock</div>
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
            <AssessmentCard level={assessmentLevel.toString()} />
          </Link>
        ) : (
          <p className="assessment-unclickable">
            <AssessmentCard level={assessmentLevel.toString()} />
          </p>
        )}
      </div>
    </>
  )
}

export default ExerciseGroup
