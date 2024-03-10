import Button from "../../components/Form/Button"
import { MatchState } from "../../types/match.types"

interface Props {
  match: MatchState
  match_key: string
  onClick: (key: string) => void
  option: boolean
}

const PlayMatchCard = ({ match, match_key, onClick, option }: Props) => {
  return (
    <div className="match-card">
      <p>time limit: {match.time_limit}</p>
      {/* <p>{match.text.length > 100?match.text.slice(0,100)+"...":match.text}</p> */}
      <p>{match.request ? "text generation type: " + match.request.type : ""}</p>
      <div className="match-card-bottom">
        <p>
          users: {match.active_players}/{match.user_limit}
        </p>
        <Button onClick={() => onClick(match_key)}>{option ? "Spectate" : "Join"}</Button>
      </div>
    </div>
  )
}

export default PlayMatchCard
