import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

import "./styles.scss"

// is shown when user is waiting for a data to be fetched
const Loading = () => {
  const [isMessageShown, setIsMessageShown] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMessageShown(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="loading">
      <div className="spinner"></div>
      {isMessageShown ? (
        <div className="loading-message">please wait, initial request may take up to 1 minute</div>
      ) : null}
    </div>
  )
}
export default Loading
