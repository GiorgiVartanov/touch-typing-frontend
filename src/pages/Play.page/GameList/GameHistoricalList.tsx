import ajax from "../../../services/ajax"
import Loading from "../../../components/Loading/Loading"
import { useEffect, useState } from "react"
import { GameState } from "../../../types/game.types"
import GameHistoricalCard from "./GameHistoricalCard"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/Form/Button"

export interface GameDatabase extends GameState {
    guid: string,
}

const GameHistoricalList = () => {
    const [games, setGames] = useState<GameDatabase[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)  
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)

            const fetchLesson = async () => {
            const response = await ajax.get('/game')

            setGames(response.data)
        }
        fetchLesson()

        setIsLoading(false)
    }, [])

    if (isLoading || !games) return <Loading />

    const onClick = (game_id: string) => {
        navigate("./"+game_id);
    }

    return (<div className="page play-body">
        <div>
        {games.map((game,ind)=>{
            return (
                <GameHistoricalCard
                    game={game}
                    onClick={onClick}
                    key={ind}
                />
            )
        })}
        </div>
        <div>
            <Button onClick={()=>navigate("../play")}>
                Back
            </Button>
        </div>
    </div>)
}

export default GameHistoricalList;