import { useState } from "react";
import Button from "../../components/Form/Button";
import { GameStateList } from "../../types/game.types";
import PlayGameCard from "./PlayGamesCard";

interface Props{
    games: GameStateList
    onClick: (key: string) => void
}

const PlayGamesList = ({games, onClick}: Props) => {
    const [option, setOption] = useState<boolean>(false)
    return (
        <div className="game-list">
            <div className="options">
                <Button key={1} className={option===false?"active":""} onClick={() => setOption(false)}>Active rooms</Button>
                <Button key={2} className={option===false?"":"active"} onClick={() => setOption(true)}>Active games</Button>
            </div>
            {
                Object.keys(games).filter(key=>games[key].has_started===option).map((key,ind)=>
                    <PlayGameCard
                        key={ind}
                        game={games[key]}
                        game_key={key}
                        onClick={onClick}
                        option={option}
                    />                    
                )
            }
        </div>
    )
}

export default PlayGamesList;