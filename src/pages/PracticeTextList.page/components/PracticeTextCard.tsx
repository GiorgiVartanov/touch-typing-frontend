import Card from "../../../components/Card/Card"

interface Props {
  title: string
  description: string
  author: string
  level: string
  _id: string
  className?: string
  style: React.CSSProperties
}

// shows text title and description
// redirects to the text page when clicked
const PracticeTextCard = ({
  title,
  description,
  author,
  level,
  _id,
  className = "",
  style,
}: Props) => {
  return (
    <Card
      to={`/practice/${_id}`}
      title={title}
      description={description}
      bottomLeft={author === "Unknown" ? "" : author}
      bottomRight={level}
      className={`text-card ${className}`}
      style={style}
    />
  )
}

export default PracticeTextCard
