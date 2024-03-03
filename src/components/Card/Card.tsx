import { Link } from "react-router-dom"

import "./styles.scss"

interface Props {
  title: string
  to: string
  description: string
  bottomLeft: string
  bottomRight: string
  className?: string
  style?: React.CSSProperties
}

const Card = ({
  title,
  to,
  description,
  bottomLeft,
  bottomRight,
  className = "",
  style,
}: Props) => {
  const renderDescription = () => {
    if (description.length > 100) return description.slice(0, 100) + "..."

    return description
  }

  return (
    <Link
      to={to}
      className={`shadow border card ${className}`}
      style={style}
    >
      <h3 className="title">{title}</h3>
      <p className="description">{renderDescription()}</p>
      <div className="card-bottom">
        <div className="bottom-left">{bottomLeft}</div>
        <div className="bottom-right">{bottomRight}</div>
      </div>
    </Link>
  )
}
export default Card
