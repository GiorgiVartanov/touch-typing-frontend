import { useState } from "react"
import Button from "../../components/Form/Button"
import { MatchStateList } from "../../types/match.types"
import PlayMatchCard from "./PlayMatchesCard"
import { useTranslation } from "react-i18next"

interface Props {
  matches: MatchStateList
  onClick: (key: string) => void
}

const PlayMatchesList = ({ matches, onClick }: Props) => {
  const [option, setOption] = useState<boolean>(false)

  const { t } = useTranslation("translation", { keyPrefix: "play page" })

  // redo with reducer
  const ongoingMatches = Object.keys(matches).filter((key) => matches[key].has_started === true)
  const waitingMatches = Object.keys(matches).filter((key) => matches[key].has_started === false)

  const renderOngoingMatches = () => {
    if (!ongoingMatches || ongoingMatches.length === 0) {
      return <div className="no-matches-message">no matches? 😭</div>
    } else {
      return ongoingMatches.map((key, ind) => (
        <PlayMatchCard
          key={ind}
          match={matches[key]}
          match_key={key}
          onClick={onClick}
          option={option}
        />
      ))
    }
  }

  const renderWaitingMatches = () => {
    if (!waitingMatches || waitingMatches.length === 0) {
      return <div className="no-matches-message">no rooms? 😭</div>
    } else {
      return waitingMatches.map((key, ind) => (
        <PlayMatchCard
          key={ind}
          match={matches[key]}
          match_key={key}
          onClick={onClick}
          option={option}
        />
      ))
    }
  }

  const renderMatches = () => {
    if (option) return renderOngoingMatches()
    else return renderWaitingMatches()
  }

  return (
    <div className="match-list">
      <div className="options">
        <Button
          className={`option-button ${option === false ? "active" : ""}`}
          onClick={() => setOption(false)}
        >
          {t("Active rooms")}
        </Button>
        <Button
          className={`option-button ${option === false ? "" : "active"}`}
          onClick={() => setOption(true)}
        >
          {t("Active matches")}
        </Button>
      </div>
      {renderMatches()}
    </div>
  )
}

export default PlayMatchesList
