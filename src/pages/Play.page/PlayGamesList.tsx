import { GameStateList } from "../../types/game.types";
import PlayGameCard from "./PlayGamesCard";

interface Props{
    games: GameStateList
    onClick: (key: string) => void
}

const PlayGamesList = ({games, onClick}: Props) => {
    return (
        <div className="game-list">
            <h2>list of games:</h2>
            {
                Object.keys(games).map((key,ind)=>
                    <PlayGameCard
                        key={ind}
                        game={games[key]}
                        game_key={key}
                        onClick={onClick}
                    />
                )
            }
        </div>
    )
}

export default PlayGamesList;