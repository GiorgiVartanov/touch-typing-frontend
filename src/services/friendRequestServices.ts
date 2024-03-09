import ajax from "./ajax"

// send friend request from the current user to the receiver with the passed username
export const sendFriendRequest = (username: string, token: string) => {
  return ajax.post(
    "/notification/friend/send",
    { username: username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

// removes passed user from current user's friend list
export const removeFriend = (friendUsername: string, token: string) => {
  return ajax.patch(
    "/friends/remove",
    { friendUsername: friendUsername },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

// blocks passed user for the current user
export const blockUser = (username: string, token: string) => {
  return ajax.patch(
    "/friends/block",
    { username: username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

// accepts friend request of the user with the passed username
export const acceptFriendRequest = (notificationId: string, token: string) => {
  return ajax.post(
    "/notification/friend/accept",
    { notificationId: notificationId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

// declines friend request of the user with the passed username
export const declineFriendRequest = (notificationId: string, token: string) => {
  return ajax.post(
    "/notification/friend/decline",
    { notificationId: notificationId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

// fetched all friends of the passed user
export const getFriends = (username: string) => {
  return ajax.get(`/friends/list/${username}`)
}

export const getFriendsSuggestions = (token: string) => {
  return ajax.get(`/friends/suggestions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
