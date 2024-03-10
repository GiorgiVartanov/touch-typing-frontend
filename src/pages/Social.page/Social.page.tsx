import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import "./styles.scss"

// import { useAuthStore } from "../../store/context/authContext"
import { getUsers } from "../../services/authServices"

import SearchBar from "../../components/SearchBar/SearchBar"
// import FriendSuggestions from "./FriendSuggestions"
import Loading from "../../components/Loading/Loading"
import UserCardList from "../../components/User/UserCardList"

const SocialPage = () => {
  // const { user } = useAuthStore()

  const [searchValue, setSearchValue] = useState<string>("")

  const handleTextChange = (newText: string) => {
    setSearchValue(newText)
  }

  const fetchUsers = async () => {
    const response = await getUsers(searchValue)

    return response.data
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchUsers,
    queryKey: ["users", searchValue],
  })

  const renderUserData = () => {
    if (isLoading) return <Loading />

    if (error || !data?.data) {
      console.log(error?.message)

      return <div>{error?.message || "something went wrong"}</div>
    }

    return (
      <UserCardList
        className="social-page-user-card-list"
        userList={data.data}
      />
    )
  }

  return (
    <div className="page social-page">
      {/* {user && user.username ? <FriendSuggestions username={user.username} /> : null} */}
      <SearchBar
        value={searchValue}
        handleTextChange={handleTextChange}
      />
      {renderUserData()}
    </div>
  )
}
export default SocialPage
