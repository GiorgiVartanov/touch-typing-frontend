import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MatchState } from "../../types/match.types"
import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"
import Button from "../../components/Form/Button"
import "./styles.scss"
import TypingArea from "../../components/TypingArea/TypingArea"
import { useTranslation } from "react-i18next"

const MatchHistorical = () => {
  const { id } = useParams()

  // State to hold the match data and loading state
  const [match, setMatch] = useState<MatchState | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const t_form = useTranslation("translation", { keyPrefix: "forms" })["t"]
  const t_play = useTranslation("translation", { keyPrefix: "play page" })["t"]

  useEffect(() => {
    setIsLoading(true)

    const fetchMatch = async () => {
      const response = await ajax.get(`/match/${id}`)

      setMatch(response.data)
    }
    fetchMatch()

    setIsLoading(false)
  }, [id])

  // If data is still loading or match data is not available, display loading component
  if (isLoading || !match) return <Loading />

  // Function to handle click event for navigating back to previous route
  const onClick = () => {
    navigate("../matches")
  }

  return (
    <div className="page history-main">
      <div className="history-header">
        <div
          key={1}
          className="history-header-top"
        >
          <h1 key={1}>
            {t_form("User limit")}: {match.user_limit}
          </h1>
          <h1 key={2}>
            {t_form("Time limit")}: {match.time_limit} {t_form("seconds")}
          </h1>
        </div>
        <div
          key={2}
          className="history-header-date"
        >
          <h1>{new Date(match.date).toString()}</h1>
        </div>
      </div>
      <div className="history-body">
        <div className="history-body-list">
          <h1 className="title">{t_play("Results")}:</h1>
          {Object.keys(match.players).map((key, ind) => {
            return (
              <div
                key={ind}
                className="card"
              >
                <h1 key={1}>{key}</h1>
                {match.players[key].WPM != -1 ? (
                  <h1 key={2}>WPM: {match.players[key].WPM.toFixed(2)}</h1>
                ) : (
                  t_play("Disconnected")
                )}
              </div>
            )
          })}
        </div>
        <div className="history-text">
          <TypingArea text={match.text} />
        </div>
      </div>
      <div className="history-button">
        <Button onClick={onClick}>{t_form("Back")}</Button>
      </div>
    </div>
  )
}

export default MatchHistorical
