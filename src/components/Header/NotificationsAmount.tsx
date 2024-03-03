import { useEffect, useState } from "react"

// import socket from "../../socket"

interface Props {
  token: string
}

const Notification = ({ token }: Props) => {
  // const [isConnected, setIsConnected] = useState(socket.connected)
  // const [amountOfNotifications, setAmountOfNotifications] = useState<boolean>(false)

  // useEffect(() => {
  //   const onConnect = () => {
  //     setIsConnected(true)
  //   }
  //   const onDisconnect = () => {
  //     setIsConnected(false)
  //   }
  //   const onReceiveNotification = () => {
  //     setAmountOfNotifications()
  //   }

  //   socket.on("connect", onConnect)
  //   socket.on("disconnect", onDisconnect)
  //   socket.on("receiveNotification", onReceiveNotification)

  //   return () => {
  //     socket.off("connect", onConnect)
  //     socket.off("disconnect", onDisconnect)
  //     socket.off("receiveNotification", onReceiveNotification)
  //   }
  // }, [token])

  return <div className="notifications-amount">3</div>
}
export default Notification
