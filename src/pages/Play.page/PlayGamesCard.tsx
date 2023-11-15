import Button from "../../components/Form/Button";
import { GameState } from "../../types/game.types";

interface Props {
    game: GameState
    game_key: string
    onClick: (key: string) => void
}

const PlayGameCard = ({game, game_key, onClick} : Props) => {
    return (
    <div className="game-card">
        <p>time limit: {game.time_limit}</p>
        <div className="game-card-bottom">
            <p>users: {game.gul.length}/{game.user_limit}</p>
            <Button onClick={()=>onClick(game_key)}>
                Join
            </Button>
        </div>
    </div>
    )
}

export default PlayGameCard;