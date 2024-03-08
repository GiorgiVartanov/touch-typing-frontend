import { Link } from "react-router-dom"

import "./styles.scss"

interface Props {
  to: string
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

const Card = ({ to, className = "", children, style }: Props) => {
  return (
    <Link
      to={to}
      className={`card ${className}`}
      style={style}
    >
      {children}
    </Link>
  )
}
export default Card
