import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GameState } from "../../../types/game.types"
import ajax from "../../../services/ajax"
import Loading from "../../../components/Loading/Loading"
import Button from "../../../components/Form/Button"


const GameHistorical = () => {
    const { id } = useParams()

    const [game, setGame] = useState<GameState | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)  
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)

            const fetchLesson = async () => {
            const response = await ajax.get(`/game/${id}`)

            setGame(response.data[0])
        }
        fetchLesson()

        setIsLoading(false)
    }, [id])

    if (isLoading || !game) return <Loading />

    const onClick = () => {
        navigate("../game")
    }

    return (
        <div className="page">
            <h1 key={-2}>Game text: {game.text}</h1>
            <h1 key={-1}>Time limit: {game.time_limit} seconds</h1>
            <h1 key={-3}>User limit: {game.user_limit}</h1>
            <h1 key={-4}>date of creation: {new Date(game.date).toString()}</h1>
            <div>
                <h1>player results:</h1>
                {Object.keys(game.gul).map((key,ind)=>{
                    return (
                        <div key={ind}>
                            <h1 key={1}>username: {key}</h1>
                            <h1 key={2}>WPM: {game.gul[key].WPM.toFixed(2)}</h1>
                        </div>
                    )
                })}
            </div>
            <Button onClick={onClick}>
                Leave
            </Button>
        </div>
    )
}

export default GameHistorical;