import Button from "../../components/Form/Button"
import { MatchState } from "../../types/match.types"
import { useTranslation } from "react-i18next"

import formatTime from "../../util/formatTime"

interface Props {
  match: MatchState
  match_key: string
  onClick: (key: string) => void
  option: boolean
}
//Duplicate code :(
const TextGenModesText: { [key: string]: string } = {
  FakeWords: "Fake words",
  CorpusWords: "Corpus words",
  Sentences: "Sentences",
}

const PlayMatchCard = ({ match, match_key, onClick, option }: Props) => {
  const { t: t_form } = useTranslation("translation", { keyPrefix: "forms" })
  const { t: t_play } = useTranslation("translation", { keyPrefix: "play page" })

  return (
    <div className="match-card">
      <div className="match-card-content">
        <p>
          {match.request
            ? t_form(TextGenModesText[match.request.type ? match.request.type : "FakeWords"])
            : ""}
        </p>
        <p>{formatTime(match.time_limit)}</p>

        <div className="user-limit">
          <p>{t_form("User limit")}:</p>
          <p className="user-limit-value">
            <span className="current-users">{match.active_players}</span>

            <span className="maximum-users">
              {"/"}
              {match.user_limit}
            </span>
          </p>
        </div>
      </div>

      <Button
        className="join-button"
        onClick={() => onClick(match_key)}
      >
        {option ? t_play("Spectate") : t_play("Join")}
      </Button>

      <div className="match-card-bottom"></div>
    </div>
  )
}

export default PlayMatchCard
