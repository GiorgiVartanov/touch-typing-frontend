import Button from "../../../components/Form/Button"
import { GameDatabase } from "./GameHistoricalList"

interface Props {
    game: GameDatabase
    onClick: (key: string) => void
}

const GameHistoricalCard = ({game, onClick} : Props) => {
    return (
    <div className="game-card">
        <p>time limit: {game.time_limit}</p>
        <p>user limit: {game.user_limit}</p>
        <p>text: {game.text}</p>
        <div className="game-card-bottom">
            <Button onClick={()=>onClick(game.guid)}>
                View
            </Button>
        </div>
    </div>
    )
}

export default GameHistoricalCard