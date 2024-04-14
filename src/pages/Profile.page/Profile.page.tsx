import { useParams, NavLink, Link, Outlet } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import SettingIcon from "../../assets/icons/gear.svg?react"
import AddUserIcon from "../../assets/icons/user-plus.svg?react"
import RemoveUserIcon from "../../assets/icons/user-minus.svg?react"
import HistoryIcon from "../../assets/icons/history.svg?react"
// import BlockUserIcon from "../../assets/icons/user-slash.svg?react"
import FriendListIcon from "../../assets/icons/user-group.svg?react"
import PageLayout from "../../layout/Page.layout/Page.layout"
import Keyboard from "../../components/Keyboard/Keyboard"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"
import { sendFriendRequest, removeFriend } from "../../services/friendRequestServices"
import { getUser } from "../../services/authServices"
import { User } from "../../types/auth.types"

import UserIcon from "../../components/User/UserIcon"
import Button from "../../components/Form/Button"
import Loading from "../../components/Loading/Loading"

// profile page
const ProfilePage = () => {
  const { username: pageOwnerUsername } = useParams()
  const { isLoggedIn, user, token, addUserToSentFriendRequests } = useAuthStore()
  const queryClient = useQueryClient()

  const currentUserUsername = user?.username

  // function to fetch user for a current page
  const fetchUser = async () => {
    if (!pageOwnerUsername) return

    const response = await getUser(pageOwnerUsername)

    return response.data
  }

  // fetched user
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", pageOwnerUsername],
    queryFn: fetchUser,
    staleTime: 1000000,
  })

  // if user does not exist
  if (!pageOwnerUsername) {
    return <div className="fetch-error-message">user with this username does not exist</div>
  }

  // renders user data
  const renderUserData = () => {
    if (isLoading) return <Loading />

    if (error) {
      console.log(error)
      return <div className="fetch-error-message">{error?.message}</div>
    }

    if (!data?.data) return <div className="fetch-error-message">something went wrong</div>

    const { username } = data.data

    return (
      <div className="profile-user-data">
        <div className="user-panel">
          <p className="username">{username}</p>
          <span className="username-text">'s profile page</span>
        </div>
        <div className="profile-page-keyboard">
          <Keyboard mode="editable" />
        </div>
      </div>
    )
  }

  return <PageLayout className="profile-page">{renderUserData()}</PageLayout>
}

export default ProfilePage
