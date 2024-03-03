export interface Notification {
  _id: string
  notificationType: "friendRequest" | "alert"
  text: string
  sender: string
  status: "pending" | "accepted" | "declined"
  read: boolean
  active: boolean
  timestamp: string
}
