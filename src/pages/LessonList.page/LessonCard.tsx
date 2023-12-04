import calculateTime from "../../util/calculateTime"

import Card from "../../components/Card/Card"

interface Props {
  title: string
  description: string
  approximateDuration: number
  level: string
  _id: string
  className?: string
  style: React.CSSProperties
}

// shows lesson image, title and description
// redirects to the lesson page when clicked
const LessonCard = ({
  title,
  description,
  approximateDuration,
  level,
  _id,
  className = "",
  style,
}: Props) => {
  return (
    <Card
      to={`/lesson/${_id}`}
      title={title}
      description={description}
      bottomLeft={calculateTime(approximateDuration)}
      bottomRight={level}
      className={`lesson-card ${className}`}
      style={style}
    />
  )
}
export default LessonCard
