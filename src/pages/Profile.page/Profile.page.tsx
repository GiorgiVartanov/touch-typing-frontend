import { useParams, NavLink, Link, Outlet } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"

import SettingIcon from "../../assets/icons/gear.svg?react"
import AddUserIcon from "../../assets/icons/user-plus.svg?react"
import RemoveUserIcon from "../../assets/icons/user-minus.svg?react"
import HistoryIcon from "../../assets/icons/history.svg?react"
// import BlockUserIcon from "../../assets/icons/user-slash.svg?react"
import FriendListIcon from "../../assets/icons/user-group.svg?react"

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

  // mutation to unfriend user
  const removeFriendMutation = useMutation({
    mutationFn: () => {
      if (!token || !pageOwnerUsername) throw new Error("no token")

      return removeFriend(pageOwnerUsername, token)
    },
    mutationKey: ["removeFriend"],
    onMutate: async () => {
      const pageOwner = queryClient.getQueryData<{ data: User }>([
        "profile",
        pageOwnerUsername,
      ])?.data

      const currentUser = queryClient.getQueryData<{ data: User }>([
        "profile",
        currentUserUsername,
      ])?.data

      if (!pageOwner) return

      const updatedPageOwner = {
        ...pageOwner,
        friends: pageOwner.friends.filter((friend) => friend !== currentUserUsername),
      }
      queryClient.cancelQueries({ queryKey: ["profile", pageOwnerUsername] })
      queryClient.setQueryData(["profile", pageOwnerUsername], { data: updatedPageOwner })

      if (!currentUser) return

      const updatedCurrentUser = {
        ...currentUser,
        friends: currentUser.friends.filter((friend) => friend !== pageOwnerUsername),
      }
      queryClient.cancelQueries({ queryKey: ["profile", currentUserUsername] })
      queryClient.setQueryData(["profile", currentUserUsername], { data: updatedCurrentUser })
    },
    onSuccess: () => {
      toast.success("Friend successfully removed")
    },
    onError: (error) => {
      // ADD SOMETHING HERE
      toast.error(error?.message || "Something went wrong")
    },
  })

  // function to send a friend request
  const handleSendFriendRequest = async () => {
    if (!pageOwnerUsername || !token) return

    toast.success("Friend request successfully sent")

    addUserToSentFriendRequests(pageOwnerUsername)
    sendFriendRequest(pageOwnerUsername, token)
  }

  // function to unfriend user
  const handleRemoveFriend = async () => {
    if (!pageOwnerUsername || !token) return
    removeFriendMutation.mutate()
  }

  // if user does not exist
  if (!pageOwnerUsername) {
    return <div className="fetch-error-message">user with this username does not exist</div>
  }

  // renders right side of user buttons
  const renderLeftButtons = () => {
    return (
      <>
        <NavLink
          to="./friends"
          className="user-action-button tooltip"
          data-tooltip="friends"
        >
          <FriendListIcon className="icon" />
        </NavLink>
        <NavLink
          to="./"
          className="user-action-button tooltip"
          data-tooltip="history"
        >
          <HistoryIcon className="icon" />
        </NavLink>
        {/* <NavLink
          to="./history"
          className="user-action-button tooltip"
          data-tooltip="history"
        >
          <HistoryIcon className="icon" />
        </NavLink> */}
      </>
    )
  }

  // renders left side of user buttons
  const renderRightButtons = (isOwnPage: boolean, isFriend: boolean) => {
    // renders buttons for page owner
    const renderRightButtonsForSelf = () => {
      return (
        <>
          <Link
            to="../settings"
            className="user-action-button tooltip"
            data-tooltip="settings"
          >
            <SettingIcon className="icon" />
          </Link>
        </>
      )
    }

    // renders buttons for page owner's friends
    const renderRightButtonsForFriend = () => {
      return (
        <>
          <Button
            onClick={handleRemoveFriend}
            className="user-action-button tooltip"
            data-tooltip="unfriend"
          >
            <RemoveUserIcon className="icon" />
          </Button>
        </>
      )
    }

    const renderRightButtonsForUserWhoSentFriendRequest = () => {
      const handleOnClick = () => {
        // toast.dismiss() // it will remove other toasts
        toast.warning("Friend request to this user was already sent")
      }

      return (
        <>
          <Button
            onClick={handleOnClick}
            className="user-action-button tooltip"
            data-tooltip="already sent"
            disabled={true}
          >
            <AddUserIcon className="icon" />
          </Button>
        </>
      )
    }

    // renders buttons for other users
    const renderRightButtonsForUser = () => {
      return (
        <>
          <Button
            onClick={handleSendFriendRequest}
            className="user-action-button tooltip"
            data-tooltip="add friend"
          >
            <AddUserIcon className="icon" />
          </Button>
        </>
      )
    }

    // renders buttons for guest users
    const renderRightButtonsForGuest = () => {
      return <></>
    }

    if (isOwnPage) return renderRightButtonsForSelf()
    if (isFriend) return renderRightButtonsForFriend()
    if (user?.sentFriendRequests?.includes(pageOwnerUsername))
      return renderRightButtonsForUserWhoSentFriendRequest()
    if (isLoggedIn) return renderRightButtonsForUser()
    return renderRightButtonsForGuest()
  }

  // renders user data
  const renderUserData = () => {
    if (isLoading) return <Loading />

    if (error) {
      console.log(error)
      return <div className="fetch-error-message">{error?.message}</div>
    }

    if (!data?.data) return <div className="fetch-error-message">something went wrong</div>

    const { username, friends } = data.data

    const isOwnPage = username === currentUserUsername
    const isFriend = friends?.includes(currentUserUsername)

    return (
      <div className="profile-user-data">
        <div className="user-actions">
          <div className="profile-buttons-left">{renderLeftButtons()}</div>
          <div className="profile-page-icon">
            <UserIcon
              username={username}
            />
            <p className="username">{username}</p>
          </div>
          <div className="profile-buttons-right">{renderRightButtons(isOwnPage, isFriend)}</div>
        </div>
        <Outlet />
      </div>
    )
  }

  return <div className="page profile-page">{renderUserData()}</div>
}

export default ProfilePage
