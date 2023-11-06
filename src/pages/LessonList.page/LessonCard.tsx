import { Link } from "react-router-dom"

import { LessonType } from "../../types/lesson.types"
import calculateTime from "../../util/calculateTime"

import defaultLessonImage from "../../assets/image.png"

interface Props extends LessonType {
  style: React.CSSProperties
}

// shows lesson image, title and description
// redirects to the lesson page when clicked
const LessonCard = ({
  image,
  title,
  description,
  approximateDuration,
  level,
  _id,
  style,
}: Props) => {
  return (
    <Link
      to={`/lesson/${_id}`}
      className={`lesson-card`}
      style={style}
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
