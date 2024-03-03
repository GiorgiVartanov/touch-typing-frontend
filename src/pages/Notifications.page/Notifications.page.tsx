import { useState, useRef } from "react"
import { toast } from "react-toastify"
import { AxiosError } from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"
import { Notification } from "../../types/notification.types"
import { User } from "../../types/auth.types"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { acceptFriendRequest, declineFriendRequest } from "../../services/friendRequestServices"
import { getNotifications } from "../../services/notificationServices"

import Loading from "../../components/Loading/Loading"
import NotificationCard from "./NotificationCard"
import NotificationList from "./NotificationList"

// notifications page
const NotificationsPage = () => {
  const notificationsRef = useRef<HTMLDivElement>(null)

  const { user, token } = useAuthStore()
  const queryClient = useQueryClient()

  const username = user?.username

  const [openNotificationId, setOpenNotificationId] = useState<string | null>(null)

  // selects notification, selected notification has accept/decline buttons
  const handleSelectNotification = (id: string) => {
    setOpenNotificationId(id)
  }

  // unselects notification
  const handleUnselectNotification = () => {
    setOpenNotificationId(null)
  }

  // function to fetch all notifications for the currently logged on user
  const fetchNotifications = async (): Promise<{ data: Notification[] } | null> => {
    if (!token) return null

    const response = await getNotifications(token)

    return response.data
  }

  // fetches notifications
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", username],
    queryFn: fetchNotifications,
    staleTime: 0,
  })

  // mutation to accept friends request
  const acceptFriendRequestMutation = useMutation({
    mutationFn: (notificationId: string) => {
      if (!token) throw new Error("no token")

      return acceptFriendRequest(notificationId, token)
    },
    mutationKey: ["acceptFriendRequest"],
    onMutate: async (notificationId: string) => {
      // optimistically adds this user to the friend list, and marks notification as resolved

      const notifications = queryClient.getQueryData<{ data: Notification[] }>([
        "notifications",
        username,
      ])?.data

      queryClient.cancelQueries({ queryKey: ["notifications", username] })

      if (!notifications) return

      let friendUsername: string | null = null

      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === notificationId) {
          const updatedNotification = { ...notification, status: "accepted" }

          friendUsername = notification.sender

          return updatedNotification
        } else {
          return notification
        }
      })

      updatedNotifications.forEach((not) => console.log(not.status))

      queryClient.setQueryData(["notifications", username], { data: updatedNotifications })

      const currentUserProfile = queryClient.getQueryData<{ data: User }>([
        "profile",
        username,
      ])?.data

      const friendProfile = queryClient.getQueryData<{ data: User }>([
        "profile",
        friendUsername,
      ])?.data

      if (!currentUserProfile || !friendUsername) return

      const updatedCurrentUserProfile = {
        ...currentUserProfile,
        friends: [...currentUserProfile.friends, friendUsername],
      }

      queryClient.cancelQueries({ queryKey: ["profile", username] })

      queryClient.setQueryData(["profile", username], { data: updatedCurrentUserProfile })

      if (!friendProfile) return

      const updatedFriendProfile = {
        ...friendProfile,
        friends: [...friendProfile.friends, username],
      }

      queryClient.cancelQueries({ queryKey: ["profile", friendUsername] })

      queryClient.setQueryData(["profile", friendUsername], { data: updatedFriendProfile })
    },
    onSuccess: () => {
      toast.success(`Successfully accepted friend request`)
    },
    onError: (error) => {
      const notificationId = acceptFriendRequestMutation.variables

      const notifications = queryClient.getQueryData<{ data: Notification[] }>([
        "notifications",
        username,
      ])?.data

      if (!notifications) return

      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === notificationId) {
          notification.status = "pending" // or set it back to the original status
          return notification
        } else {
          return notification
        }
      })

      queryClient.setQueryData(["notifications", username], { data: updatedNotifications })

      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data.message}`)
      } else {
        toast.error(`something went wrong`)
      }
    },
  })

  // mutation to reject friend request
  const declineFriendRequestMutation = useMutation({
    mutationFn: (notificationId: string) => {
      if (!token) throw new Error("no token")

      return declineFriendRequest(notificationId, token)
    },
    mutationKey: ["notifications", username],
    onMutate: async (notificationId: string) => {
      // optimistically marks notification as resolved

      const notifications = queryClient.getQueryData<{ data: Notification[] }>([
        "notifications",
        username,
      ])?.data

      if (!notifications) return

      const updatedNotifications = notifications.filter((notification) => {
        if (notification._id === notificationId) {
          return notification
        } else {
          notification.status = "declined"
          return notification
        }
      })

      queryClient.setQueryData(["notifications", username], { data: updatedNotifications })
    },
    onSuccess: () => {
      toast.success(`Successfully accepted friend request`)
    },
    onError: (error) => {
      const notificationId = acceptFriendRequestMutation.variables

      const notifications = queryClient.getQueryData<{ data: Notification[] }>([
        "notifications",
        username,
      ])?.data

      if (!notifications) return

      const updatedNotifications = notifications.map((notification) => {
        if (notification._id === notificationId) {
          notification.status = "pending" // or set it back to the original status
          return notification
        } else {
          return notification
        }
      })

      queryClient.setQueryData(["notifications", username], { data: updatedNotifications })

      if (error instanceof AxiosError) {
        toast.error(`${error?.response?.data.message}`)
      } else {
        toast.error(`something went wrong`)
      }
    },
  })

  // unselects selected notification when user clicks somewhere
  useOnClickOutside(notificationsRef, handleUnselectNotification)

  // renders notifications
  const renderNotifications = () => {
    if (isLoading) return <Loading />

    if (error || !data?.data) return <div className="fetch-error-message">{error?.message}</div>

    const notifications = data.data

    if (notifications.length === 0)
      return <div className="fetch-error-message">you don't have any notifications</div>

    return (
      <NotificationList ref={notificationsRef}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notificationType={notification.notificationType}
            text={notification.text}
            status={notification.status}
            sender={notification.sender}
            timestamp={notification.timestamp}
            onAccept={() => {
              acceptFriendRequestMutation.mutate(notification._id)
            }}
            onDecline={() => {
              declineFriendRequestMutation.mutate(notification._id)
            }}
            selectAsOpen={() => {
              handleSelectNotification(notification._id)
            }}
            isOpen={openNotificationId === notification._id}
          />
        ))}
      </NotificationList>
    )
  }

  return (
    <div className="page notification-page">
      <h2 className="notification-page-title">notifications</h2>
      {renderNotifications()}
    </div>
  )
}
export default NotificationsPage
