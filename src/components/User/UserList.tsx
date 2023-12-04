import { User } from "../../types/auth.types"

import UserIcon from "./UserIcon"

interface Props {
  users: User[]
}

const UserList = ({ users }: Props) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserIcon
          username={user.username}
          key={user.username}
        />
      ))}
    </div>
  )
}
export default UserList
