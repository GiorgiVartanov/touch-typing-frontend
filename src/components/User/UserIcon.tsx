import "./style.scss"

interface Props {
  username: string
  className?: string
  style?: React.CSSProperties
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const UserIcon = ({ username, className = "", style = {}, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`user-icon ${className}`}
    >
      <span>{username[0]}</span>
    </div>
  )
}

export default UserIcon
