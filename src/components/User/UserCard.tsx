import "./style.scss"

import Card from "../Card/Card"
import UserIcon from "./UserIcon"

interface Props {
  username: string
  style?: React.CSSProperties
}

const UserCard = ({ username, style }: Props) => {
  return (
    <Card
      className="user-card"
      style={style}
      to={`../../profile/${username}/`}
    >
      <UserIcon username={username} />
      <p className="card-username"> {username}</p>
    </Card>
  )
}
export default UserCard
