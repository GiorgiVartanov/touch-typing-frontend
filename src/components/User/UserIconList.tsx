import { User } from "../../types/auth.types"

import UserIcon from "./UserIcon"

interface Props {
  userList: User[]
}

const UserIconList = ({ userList }: Props) => {
  return (
    <div className="user-list">
      {userList.map((user) => (
        <UserIcon
          key={user.username}
          username={user.username}
        />
      ))}
    </div>
  )
}

export default UserIconList
