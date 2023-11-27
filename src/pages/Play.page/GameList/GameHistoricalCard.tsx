import Button from "../../../components/Form/Button"
import { GameState } from "../../../types/game.types"

interface Props {
    game: GameState
    onClick: (key: string) => void
}

const GameHistoricalCard = ({game, onClick} : Props) => {
    return (
    <div className="game-card">
        <div className="head">
            <p>time limit: {game.time_limit} seconds</p>
            <p>user limit: {game.user_limit}</p>
        </div>
        <p>{game.text.length > 100 ? game.text.slice(0,100) + "..." : game.text}</p>
        <div className="game-card-bottom">
            <p>{new Date(game.date).toString().slice(4,25)}</p>
            <Button onClick={()=>onClick(game._id)}>
                View
            </Button>
        </div>
    </div>
    )
}

export default GameHistoricalCard