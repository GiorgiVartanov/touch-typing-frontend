import UserIcon from "../../components/User/UserIcon"
import Button from "../../components/Form/Button"

const formatDate = (date: Date) => {
  const now = new Date()

  const diffMilliseconds = now.getTime() - date.getTime()
  const seconds = Math.floor(diffMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return "now"
  } else if (minutes < 60) {
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`
  } else if (hours < 24) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`
  } else if (days < 7) {
    return days === 1 ? `${days} day ago` : `${days} days ago`
  } else {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }
}

interface Props {
  notificationType: string
  text: string
  sender: string
  timestamp: string
  status: "pending" | "accepted" | "declined"
  onAccept?: () => void
  onDecline?: () => void
  selectAsOpen: () => void
  isOpen: boolean
}

// renders single notification
const NotificationCard = ({
  notificationType,
  text,
  sender,
  timestamp,
  status,
  onAccept,
  onDecline,
  selectAsOpen,
  isOpen,
}: Props) => {

  // renders buttons for a selected notification (notification can be selected only if it has a "pending" status)
  const renderFriendRequestButtons = () => {
    if (status !== "pending" || !onAccept || !onDecline) return

    return (
      <div className="friend-request-buttons">
        <Button
          onClick={onAccept}
          className="accept"
        >
          accept
        </Button>
        <Button
          onClick={onDecline}
          className="decline"
        >
          decline
        </Button>
      </div>
    )
  }

  return (
    <div
      onClick={() => {
        if (status === "pending") return selectAsOpen()
      }}
      className={`notification-card ${status !== "pending" ? "notification-resolved" : ""} ${
        isOpen && status === "pending" ? "notification-open" : ""
      }`}
    >
      <div className="notification-sender">
        <UserIcon
          className="notification-icon"
          smallNameSize
          username={sender}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      </div>
      <div className="notification-content">
        <p className="notification-text">{text}</p>
        {status === "accepted" ? <p className="notification-accepted">accepted</p> : null}
        {status === "declined" ? <p className="notification-rejected">declined</p> : null}
        <p className="notification-date">{formatDate(new Date(timestamp))}</p>
        {notificationType === "friendRequest" && isOpen ? renderFriendRequestButtons() : null}
      </div>
    </div>
  )
}
export default NotificationCard
