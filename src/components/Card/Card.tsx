import { Link } from "react-router-dom"

import "./styles.scss"

interface Props {
  title: string
  to: string
  description: string
  bottomLeft: string
  bottomRight: string
  className?: string
  style: React.CSSProperties
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
  return (
    <Link
      to={to}
      className={`card ${className}`}
      style={style}
    >
      <h3 className="title">{title}</h3>
      <p className="description">{description}</p>
      <div className="card-bottom">
        <div className="bottom-left">{bottomLeft}</div>
        <div className="bottom-right">{bottomRight}</div>
      </div>
    </Link>
  )
}
export default Card
