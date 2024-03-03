import { forwardRef } from "react"

interface Props {
  title?: string
  children: React.ReactNode
}

// renders notification list
const NotificationList = forwardRef<HTMLDivElement, Props>(({ title, children }: Props, ref) => {
  return (
    <div
      ref={ref}
      className="notification-list"
    >
      {title ? <h2>{title}</h2> : null}
      <div className="notification-list-cards">{children}</div>
    </div>
  )
})

export default NotificationList
