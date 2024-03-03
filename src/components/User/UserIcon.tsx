import { Link } from "react-router-dom"

import "./style.scss"

interface Props {
  username: string
  includeName?: boolean
  smallNameSize?: boolean
  className?: string
  style?: React.CSSProperties
  vertical?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const UserIcon = ({
  username,
  includeName = true,
  smallNameSize = false,
  className = "",
  style = {},
  vertical = false,
  onClick,
}: Props) => {
  return (
    <Link
      onClick={onClick}
      to={`../../profile/${username}/`}
      className={`user-icon-wrapper ${vertical ? "user-icon-vertical" : ""} ${className}`}
      style={style}
    >
      <div className="user-icon">
        <span>{username[0]}</span>
      </div>
      {includeName ? (
        <span className={`username ${smallNameSize ? "username-small" : null}`}>{username}</span>
      ) : null}
    </Link>
  )
}

export default UserIcon
