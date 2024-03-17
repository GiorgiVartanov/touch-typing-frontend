import Button from "../../components/Form/Button"
import { MatchState } from "../../types/match.types"
import { useTranslation } from "react-i18next"

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
}

const PlayMatchCard = ({ match, match_key, onClick, option }: Props) => {
  const t_form = useTranslation("translation", { keyPrefix: "forms" })["t"]
  const t_play = useTranslation("translation", { keyPrefix: "play page" })["t"]

  return (
    <div className="match-card">
      <p>
        {t_form("Time limit")}: {match.time_limit}
      </p>
      {/* <p>{match.text.length > 100?match.text.slice(0,100)+"...":match.text}</p> */}
      <p>
        {match.request
          ? t_form("Text generation options") +
            ": " +
            t_form(TextGenModesText[match.request.type ? match.request.type : "FakeWords"])
          : ""}
      </p>
      <div className="match-card-bottom">
        <p>
          {t_form("User limit")}: {match.active_players}/{match.user_limit}
        </p>
        <Button onClick={() => onClick(match_key)}>
          {option ? t_play("Spectate") : t_play("Join")}
        </Button>
      </div>
    </div>
  )
}

export default PlayMatchCard
