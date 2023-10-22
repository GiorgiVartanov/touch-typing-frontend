import { Link } from "react-router-dom"

import { LessonType } from "../../types/lesson.types"
import calculateTime from "../../util/calculateTime"

import defaultLessonImage from "../../assets/image.png"

const LessonCard = ({ image, title, description, approximateDuration, level, _id }: LessonType) => {
  return (
    <Link
      to={`/lesson/${_id}`}
      className={`lesson-card`}
    >
      <img
        src={image || defaultLessonImage}
        alt={title}
      />
      <div className="lesson-information">
        <div>
          <h4 className="lesson-title">{title}</h4>
          <p>{description}</p>
        </div>
        <div className="lesson-short-info">
          <span>{calculateTime(approximateDuration)}</span>
          <span>{level}</span>
        </div>
      </div>
    </Link>
  )
}
export default LessonCard
