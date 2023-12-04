import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ajax from "../../services/ajax"

import SettingsIcon from "../../assets/icons/gear.svg?react"
import AddUserIcon from "../../assets/icons/user-plus-solid.svg?react"
import RemoveUserIcon from "../../assets/icons/user-minus-solid.svg?react"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"
import { User } from "../../types/auth.types"

import UserIcon from "../../components/User/UserIcon"
import UserList from "../../components/User/UserList"

const ProfilePage = () => {
  const { username } = useParams()
  const { isLoggedIn, user, token } = useAuthStore()

  const currentUserUsername = user?.username

  const [friends, setFriends] = useState<User[]>([])
  const [followers, setFollowers] = useState<User[]>([])
  const [followings, setFollowings] = useState<User[]>([])

  const [isLoadingFriends, setIsLoadingFriends] = useState<boolean>(false)
  const [isLoadingFollowers, setIsLoadingFollowers] = useState<boolean>(false)
  const [isLoadingFollows, setIsLoadingFollows] = useState<boolean>(false)

  useEffect(() => {
    setIsLoadingFriends(true)
    setIsLoadingFollowers(true)
    setIsLoadingFollows(true)

    const fetchFriends = async () => {
      const fetchedFriends = await ajax.get(`/friendship/friends/${username}`)

      setFriends(fetchedFriends.data.data)
      setIsLoadingFriends(false)
    }
    const fetchFollowers = async () => {
      const fetchedFollowers = await ajax.get(`/friendship/followers/${username}`)

      setFollowers(fetchedFollowers.data.data)
      setIsLoadingFollowers(false)
    }
    const fetchFollowings = async () => {
      const fetchedFollowings = await ajax.get(`/friendship/followings/${username}`)

      setFollowings(fetchedFollowings.data.data)
      setIsLoadingFollows(false)
    }

    fetchFriends()
    fetchFollowers()
    fetchFollowings()
  }, [username])

  if (!username || !followers || !friends) {
    return <div>user with this username does not exist</div>
  }

  const followUser = () => {
    ajax.post(
      `/friendship/follow/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const unfollowUser = () => {
    ajax.post(
      `/friendship/unfollow/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }

  const renderFollowButton = () => {
    if (!isLoggedIn) return

    const followersUsernames = followers.map((follower) => follower?.username)

    if (currentUserUsername && followersUsernames.includes(currentUserUsername)) {
      return (
        <button onClick={unfollowUser}>
          <RemoveUserIcon />
        </button>
      )
    } else {
      return (
        <button onClick={followUser}>
          <AddUserIcon />
        </button>
      )
    }
  }

  return (
    <div className="page profile-page">
      <div className="user-information">
        <div className="user-actions">
          <UserIcon
            username={username}
            includeName={true}
          />
          <div className="user-actions-buttons">
            {currentUserUsername !== username ? (
              renderFollowButton()
            ) : (
              <button>
                <SettingsIcon />
              </button>
            )}
          </div>
        </div>
        {friends.length > 0 || isLoadingFriends ? (
          <div>
            <h2>
              {username === currentUserUsername ? "your" : username + "`s"}
              <span>friends</span>
            </h2>
            <UserList users={friends} />
          </div>
        ) : (
          ""
        )}
        {followers.length > 0 || isLoadingFollowers ? (
          <div>
            <h2>
              {username === currentUserUsername ? "your" : username + "`s"} <span>followers</span>
            </h2>
            <UserList users={followers} />
          </div>
        ) : (
          ""
        )}
        {followings.length > 0 || isLoadingFollows ? (
          <div>
            <h2>
              {username === currentUserUsername ? "your" : username + "`s"} <span>follows</span>
            </h2>
            <UserList users={followings} />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="user-posts-wrapper"></div>
    </div>
  )
}
export default ProfilePage
