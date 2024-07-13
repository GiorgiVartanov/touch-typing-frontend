import { useTranslation } from "react-i18next"

import Card from "../../../components/Card/Card"

interface Props {
  title: string
  description: string
  author: string
  level: string
  text: string
  _id: string
  className?: string
  style?: React.CSSProperties
}

// shows text title and description
// redirects to the text page when clicked
const PracticeTextCard = ({
  title,
  description,
  author,
  level,
  text,
  _id,
  className = "",
  style,
}: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "practice" })

  const renderDescription = () => {
    if (text.length > 100) return text.slice(0, 100) + "..."

    return text
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
        {/* <div className="bottom-right">{t(level)}</div> */}
      </div>
    </Card>
  )
}

export default PracticeTextCard
