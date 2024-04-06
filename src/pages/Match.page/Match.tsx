import { useNavigate } from "react-router-dom"
import { usePlayStore } from "../../store/context/playContext"
import Button from "../../components/Form/Button"
import TypingAreaPlay from "../../components/TypingAreaPlay/TypingAreaPlay"
import { useEffect } from "react"
import Timer from "./Timer"
import "./styles.scss"
import { useTranslation } from "react-i18next"

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

  // If match_id is undefined or user is not authorized, display "Unauthorized"
  if (
    match_id === undefined ||
    matches[match_id] === undefined ||
    (matches[match_id].players[uid] === undefined &&
      matches[match_id].spectators[uid] === undefined)
  )
    return (
      <div className="page">
        <h1>{t("Unauthorized")}</h1>
      </div>
    )

  // Function to leave the match
  const leaveMatch = () => {
    LeaveMatch(match_id) // Disconnect user from the match
    navigate("../play") // Navigate back to play page
    return
  }

  const match = matches[match_id] // Update variable

  return (
    <PageLayout className="match">
      {/* Update class name */}
      {match.has_started !== true ? (
        <>
          <h1>
            {t("Waiting for users to join")}: {match.active_players}/{match.user_limit}{" "}
          </h1>
          <Button
            onClick={() => leaveMatch()} // Update function call
          >
            {t("Leave")}
          </Button>
        </>
      ) : (
        <>
          <h1 className="spectators">
            {t("Spectators")}: {Object.keys(match.spectators).length}
          </h1>
          {match.players[uid] === undefined || match.players[uid].has_finished === true ? (
            <></>
          ) : (
            <>
              <h1 className="head">{t("The match has started. Good luck!")}</h1>
              <Timer duration={match.time_limit} />
            </>
          )}
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
                  <h1 key={1}>{match.players[uid].username}</h1>
                  <h1 key={2}>
                    {match.players[uid].WPM !== -1
                      ? match.players[uid].has_finished
                        ? " WPM: "
                        : " " + t("Progress") + ": "
                      : " " + t("Disconnected") + ": "}
                    {match.players[uid].WPM.toFixed(2)}
                    {match.players[uid].has_finished ? "" : "%"}
                  </h1>
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
        </>
      )}
    </PageLayout>
  )
}

export default Match
