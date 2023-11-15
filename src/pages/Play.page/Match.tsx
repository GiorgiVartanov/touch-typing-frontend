import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePlayStore } from "../../store/context/playContext";
import Button from "../../components/Form/Button";
import PlayPage from "./Play.page";
import Typer from "../../components/Typer/Typer";

const Match = () => {
    const {game_id, games, LeaveGame} = usePlayStore()
    const navigate = useNavigate();

    if(game_id === undefined)        
        return <h1>Unauthorized</h1>

    const leaveGame = () => {
        LeaveGame(game_id);
        navigate("../play")
        return;
    }

    const game = games[game_id]

    return (
        <div className="page match">
            { game.gul.length !== game.user_limit ?
                <>
                    <h1>
                        Waiting for users to join: {game.gul.length}/{game.user_limit}
                    </h1>
                    <Button
                        onClick={()=>leaveGame()}
                    >
                        Leave the game
                    </Button>
                </>
                :
                <div>
                    <h1>The game has started. Good luck!</h1>
                    <Typer
                        text={game.text}
                    />
                </div>
            }
        </div>
    )
}

export default Match;