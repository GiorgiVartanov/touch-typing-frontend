import { User } from "../../types/auth.types"

import UserIcon from "./UserIcon"

interface Props {
  userList: string[]
}

const UserIconList = ({ userList }: Props) => {
  return (
    <div className="user-list">
      {userList.map((user, index) => (
        <UserIcon
          key={user}
          username={user}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </div>
  )
}

export default UserIconList
