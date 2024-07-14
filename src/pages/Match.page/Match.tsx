import { useNavigate } from "react-router-dom"
import { usePlayStore } from "../../store/context/playContext"
import Button from "../../components/Form/Button"
import TypingAreaPlay from "../../components/TypingAreaPlay/TypingAreaPlay"
import { useEffect } from "react"
import Timer from "./Timer"
import "./styles.scss"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import PageLayout from "../../layout/Page.layout/Page.layout"

const Match = () => {
  const {
    uid,
    username,
    match_id,
    matches,
    LeaveMatch,
    ModifyMatch,
    NotifyFinish,
    match_finished,
  } = usePlayStore() // Update variables
  const navigate = useNavigate()
  const { t } = useTranslation("translation", { keyPrefix: "play page" })

  //If user navigates away from the match, he automatically disconnects... (couldn't make the "useLocation" work... probably something wrong with the playContext)
  useEffect(() => {
    if (match_finished === true) navigate("../matches/" + match_id) // Navigate to the finished match
    return () => {
      if (location.pathname !== "/match/" + match_id && match_id) {
        // Update pathname
        LeaveMatch(match_id) // Disconnect user if they navigate away from the match
      }
    }
  }, [match_finished])

  // useEffect(() => {
  //   if (match.players[uid] === undefined || match.players[uid].has_finished === true) return

  //   // may change latter
  //   toast.success(t("The match has started. Good luck!"))
  // }, [])

  useEffect(() => {
    if (!match_id) return

    const match = matches[match_id]

    if (!match || !match.has_started) return

    toast.success(t("The match has started. Good luck!"), { toastId: "match star message" })
  }, [match_id, matches.length])

  // If match_id is undefined or user is not authorized, display "Unauthorized"
  if (
    match_id === undefined ||
    matches[match_id] === undefined ||
    (matches[match_id].players[uid] === undefined &&
      matches[match_id].spectators[uid] === undefined)
  ) {
    if (match_finished === true) {
      navigate("../../")
      return
    }

    toast.warning(t("Unauthorized"), { toastId: "unauthorized" })
    navigate("../../")

    return
  }

  // Function to leave the match
  const leaveMatch = () => {
    LeaveMatch(match_id) // Disconnect user from the match
    navigate("../play") // Navigate back to play page
    return
  }

  const match = matches[match_id] // Update variable

  const renderMatchWaitingMessage = () => {
    return (
      <div className="waiting-message">
        <h1>
          {t("Waiting for users to join")}: {match.active_players}/{match.user_limit}{" "}
        </h1>
        <Button
          className="leave-match-button"
          onClick={() => leaveMatch()} // Update function call
        >
          {t("Leave")}
        </Button>
      </div>
    )
  }

  const renderMatch = () => {
    return (
      <div className="ongoing-match">
        <div className="ongoing-match-top-panel">
          <div className="timer-wrapper">
            <Timer duration={match.time_limit} />
          </div>
          <p className="spectators">
            {t("Spectators")}: {Object.keys(match.spectators).length}
          </p>
        </div>

        <div className="list">
          {Object.keys(match.players).map((uid, ind) => {
            return (
              <div
                key={ind}
                className={
                  (match.players[uid].username === username ? "active-background" : "") +
                  " list_element"
                }
              >
                <div
                  className={`progress-bar ${Number(match.players[uid].WPM.toFixed(2)) > 98 || match.players[uid].has_finished ? t("finished") : ""}`}
                  style={{ width: `${match.players[uid].WPM.toFixed(2)}%` }}
                />
                <div className="match-user-rating">
                  {match.players[uid]
                    ? match.players[uid].rating
                      ? match.players[uid].rating.toFixed(0)
                      : t("Unrated")
                    : t("Unrated")}
                </div>
                <div className="list-element-user">{match.players[uid].username}</div>

                <div className="list-element-percent">
                  {match.players[uid].WPM !== -1
                    ? match.players[uid].has_finished
                      ? " WPM: "
                      : " "
                    : " " + t("Disconnected") + ": "}
                  {match.players[uid].WPM.toFixed(2)}
                  {match.players[uid].has_finished ? "" : "%"}
                </div>
              </div>
            )
          })}
        </div>

        {match.players[uid] === undefined || match.players[uid].has_finished === true ? (
          <Button onClick={() => leaveMatch()}>{t("Leave the match")}</Button>
        ) : (
          <TypingAreaPlay
            ModifyMatch={ModifyMatch}
            handleTextFinish={NotifyFinish}
            text={match.text}
          />
        )}
      </div>
    )
  }

  return (
    <PageLayout className="match">
      {/* Update class name */}
      {match.has_started !== true ? renderMatchWaitingMessage() : renderMatch()}
    </PageLayout>
  )
}

export default Match
