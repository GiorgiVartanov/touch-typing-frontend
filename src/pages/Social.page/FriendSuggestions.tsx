import { useQuery } from "@tanstack/react-query"

import { useAuthStore } from "../../store/context/authContext"
import { getFriendsSuggestions } from "../../services/friendRequestServices"

import Loading from "../../components/Loading/Loading"
import UserCardList from "../../components/User/UserCardList"

interface Props {
  username: string
}

const FriendSuggestions = ({ username }: Props) => {
  const { token } = useAuthStore()

  const fetchFriendSuggestions = async () => {
    if (!token) return null

    const response = await getFriendsSuggestions(token)
    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchFriendSuggestions,
    queryKey: ["friend-suggestions", username],
  })

  if (isLoading) {
    console.log("hi")
    return <Loading />
  }

  if (error || !data?.data)
    return <div className="error-message">{error?.message || "something went wrong"}</div>

  return (
    <div className="friend-suggestions">
      <h2>you may know</h2>
      <UserCardList
        userList={data.data}
        className="friend-suggestions-users"
      />
    </div>
  )
}
export default FriendSuggestions
