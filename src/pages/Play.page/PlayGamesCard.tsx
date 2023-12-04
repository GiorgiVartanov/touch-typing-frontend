import Button from "../../components/Form/Button";
import { GameState } from "../../types/game.types";

interface Props {
    game: GameState
    game_key: string
    onClick: (key: string) => void
    option: boolean
}

const PlayGameCard = ({game, game_key, onClick, option} : Props) => {
    return (
    <div className="game-card">
        <p>time limit: {game.time_limit}</p>
        <p>{game.text.length > 100?game.text.slice(0,100)+"...":game.text}</p>
        <div className="game-card-bottom">
            <p>users: {game.active_players}/{game.user_limit}</p>
            <Button onClick={()=>onClick(game_key)}>
                {option?"Spectate":"Join"}
            </Button>
        </div>
    </div>
    )
}

export default PlayGameCard;