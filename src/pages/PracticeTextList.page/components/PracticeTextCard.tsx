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
  const renderDescription = () => {
    if (description.length > 100) return description.slice(0, 100) + "..."

    return description
  }
  return (
    <Card
      to={`/practice/${_id}`}
      className={`text-card ${className}`}
      style={style}
    >
      <h3 className="title">{title}</h3>
      <p className="description">{renderDescription()}</p>
      <div className="card-bottom">
        <div className="bottom-left">{author === "Unknown" ? "" : author}</div>
        <div className="bottom-right">{level}</div>
      </div>
    </Card>
  )
}

export default PracticeTextCard
