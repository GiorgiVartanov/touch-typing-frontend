import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import formatTime from "../../util/formatTime"

const Timer = ({ duration }: { duration: number }) => {
  const [countdown, setCountdown] = useState(duration)
  const { t } = useTranslation("translation", { keyPrefix: "play page" })

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

  return (
    <div className="timer">
      <span className="timer-text">{t("Time left")}</span> {formatTime(countdown)}
    </div>
  )
}

export default Timer
