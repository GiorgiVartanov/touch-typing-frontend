import { User } from "../../types/auth.types"

import UserIcon from "./UserIcon"

interface Props {
  title: React.ReactNode
  users: User[]
}

const UserList = ({ users, title }: Props) => {
  return (
    <div>
      {title}
      <div className="user-list">
        {users.map((user) => (
          <UserIcon
            username={user.username}
            key={user.username}
          />
        ))}
      </div>
    </div>
  )
}
export default UserList
