import ajax from "../../../services/ajax"
import Loading from "../../../components/Loading/Loading"
import { useEffect, useState } from "react"
import { GameState } from "../../../types/game.types"
import GameHistoricalCard from "./GameHistoricalCard"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/Form/Button"
import SearchBar from "../../../components/SearchBar/SearchBar"


const GameHistoricalList = () => {
    const [games, setGames] = useState<GameState[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)  
    const [userSearch, setUserSearch] = useState<string>(""); //has to be saved when navigating...
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        const fetchLesson = async () => {
            const response = await ajax.get(`/game?username=${userSearch}`)

            setGames(response.data)
        }
        fetchLesson()

        setIsLoading(false)
    }, [userSearch])

    if (isLoading || !games) return <Loading />

    const onClick = (game_id: string) => {
        navigate("./"+game_id);
    }

    const handleTextChange = (newText: string) => {
        setUserSearch(newText)
    }    

    return (<div className="page game-body">
        <SearchBar
            value={userSearch}
            handleTextChange={handleTextChange}
        />
        <div className="game-body-main">
            <div className="game-body-main-list">
                {games.slice(0).reverse().map((game,ind)=>{ //newer games first
                    return (
                        <GameHistoricalCard
                            game={game}
                            onClick={onClick}
                            key={ind}
                        />
                    )
                })}
            </div>
            <div className="back">
                <Button onClick={()=>navigate("../play")}>
                    Back
                </Button>
            </div>
        </div>        
    </div>)
}

export default GameHistoricalList;