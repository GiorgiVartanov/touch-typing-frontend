import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { GameState } from "../../../types/game.types"
import ajax from "../../../services/ajax"
import Loading from "../../../components/Loading/Loading"
import Button from "../../../components/Form/Button"
import "../styles.scss"
import Typer from "../../../components/Typer/Typer"

const GameHistorical = () => {
    const { id } = useParams()

    const [game, setGame] = useState<GameState | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)  
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)

            const fetchLesson = async () => {
            const response = await ajax.get(`/game/${id}`)

            setGame(response.data)
        }
        fetchLesson()

        setIsLoading(false)
    }, [id])

    if (isLoading || !game) return <Loading />

    const onClick = () => {
        navigate("../game")
    }

    return (
        <div className="page history-main">
            <div className="history-header">
                <div key={1} className="history-header-top">
                    <h1 key={1}>
                        User limit: {game.user_limit}
                    </h1>
                    <h1 key={2}>
                        Time limit: {game.time_limit}
                    </h1>
                </div>
                <div key={2} className="history-header-date">
                    <h1>{new Date(game.date).toString()}</h1>
                </div>
            </div>
            <div className="history-body">
                <div className="history-body-list">
                    <h1 className="title">Results:</h1>
                    {Object.keys(game.gul).map((key,ind)=>{
                        return (
                            <div key={ind} className="card">
                                <h1 key={1}>{key}</h1>
                                <h1 key={2}>WPM: {game.gul[key].WPM.toFixed(2)}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className="history-text">
                    {/* <h1>Text used:</h1> */}
                    <Typer
                        text={game.text}
                    />
                </div>
            </div>
            <div className="history-button">
                <Button onClick={onClick}>
                    Back
                </Button>
            </div>
        </div>
    )
}

export default GameHistorical;