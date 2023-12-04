import { Link } from "react-router-dom"

import "./style.scss"

interface Props {
  username: string
  includeName?: boolean
  className?: string
}

const UserIcon = ({ username, includeName = true, className = "" }: Props) => {
  return (
    <Link
      to={`../profile/${username}`}
      className={`user-icon-wrapper ${className}`}
    >
      <div className="user-icon">
        <span>{username[0]}</span>
      </div>
      {includeName ? <div>{username}</div> : null}
    </Link>
  )
}

export default UserIcon
