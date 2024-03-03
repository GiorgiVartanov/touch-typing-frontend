import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import { getUser } from "../../services/authServices"

import Loading from "../../components/Loading/Loading"
import UserIconList from "../../components/User/UserIconList"

// user's friends
const Friends = () => {
  const { username } = useParams()

  // function to fetch user
  const fetchUser = async () => {
    if (!username) return

    const response = await getUser(username)
    return response.data.data
  }

  // fetches user data
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", username],
    queryFn: fetchUser,
    staleTime: 1000000,
  })

  if (!username) return

  // renders user's friends
  const renderFriends = () => {
    if (isLoading) return <Loading />

    if (error || !data) return <div className="fetch-error-message">{error?.message}</div>

    const { friends } = data.data

    // if user has not friends
    if (!friends || friends.length === 0) {
      return <div className="fetch-error-message">its empty here</div>
    }

    return <UserIconList userList={friends} />
  }

  return (
    <div className="profile-page-subpage friend-list">
      <h2 className="subpage-title">
        <span className="username">{username}</span>'s friends
      </h2>
      {renderFriends()}
    </div>
  )
}
export default Friends
