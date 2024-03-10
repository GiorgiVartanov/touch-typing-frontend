import "./style.scss"

import UserCard from "./UserCard"
import CardList from "../Card/CardList"

interface Props {
  userList: string[]
  className?: string
}

const UserCardList = ({ userList, className = "" }: Props) => {
  return (
    <CardList className={`user-card-list ${className}`}>
      {userList.map((username: string, index) => (
        <UserCard
          key={username}
          username={username}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </CardList>
  )
}
export default UserCardList
