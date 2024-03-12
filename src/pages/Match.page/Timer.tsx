import { useEffect, useState } from "react"

const Timer = ({ duration }: { duration: number }) => {
  const [countdown, setCountdown] = useState(duration)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(timer)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [duration])

  return <div className="timer">Time left: {countdown}</div>
}

export default Timer
