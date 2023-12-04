import { useNavigate } from "react-router-dom";
import { usePlayStore } from "../../store/context/playContext";
import Button from "../../components/Form/Button";
import TyperPlay from "../../components/TyperPlay/TyperPlay";
import calculateWPM from "../../util/calculateWPM";
import { useEffect } from "react";


const Match = () => {
    const {uid, username, game_id, games, LeaveGame, ModifyMatch, NotifyFinish, match_finished} = usePlayStore()
    const navigate = useNavigate();

    //If user navigates away from the match, he automatically disconnects... (couldn't make the "useLocation" work... probably something wrong with the playContext)
    useEffect(()=>{
        if(match_finished===true)
            navigate("../game/"+game_id)
        return () => {
            if(location.pathname!=="/play/"+game_id && game_id){
                LeaveGame(game_id);
            }
        }
    }, [match_finished])

    if(game_id === undefined || games[game_id] === undefined || (games[game_id].gul[uid] === undefined && games[game_id].spectators[uid] === undefined))     
        return <div className="page"><h1>Unauthorized</h1></div>

    //deletes user to game info from the database, and goes to the play page...
    const leaveGame = () => {
        LeaveGame(game_id);
        navigate("../play")
        return;
    }

    const game = games[game_id]

    //calculates WPM of the user and sends it to the backend
    const finishHandler = (lettersStatuses:(0 | 1 | 2)[][], startTime : Date | null)  =>{
        const finishTime = new Date()
        let timeTaken = 0;
        if(startTime){
            timeTaken = finishTime.getTime() - startTime.getTime();
        }
        NotifyFinish(calculateWPM(timeTaken/1000, lettersStatuses));
    }

    return (
        <div className="page match">            
            { game.has_started !== true ?
                <>
                    <h1>
                        Waiting for users to join: {game.active_players}/{game.user_limit}
                    </h1>
                    <Button
                        onClick={()=>leaveGame()}
                    >
                        Leave
                    </Button>
                </>
                :
                <>
                    <h1>spectators: {Object.keys(game.spectators).length}</h1>
                    {game.gul[uid] === undefined || game.gul[uid].has_finished === true ? <></> : <h1 className="head">The game has started. Good luck!</h1>}
                    {
                        Object.keys(game.gul).map((uid, ind)=>{
                            return <div key={ind} className={(game.gul[uid].username===username?"active-background":"")+ " list"}>
                                <h1 key={1}>
                                    { game.gul[uid].username }
                                </h1>
                                <h1 key={2}>
                                    { game.gul[uid].WPM !== -1 ?
                                        game.gul[uid].has_finished ? " WPM: " : " Progress: "
                                        :" Disconnected: " }
                                    { game.gul[uid].WPM.toFixed(2) }
                                    { game.gul[uid].has_finished ? "" : "%" }
                                </h1>
                            </div>
                        })
                    }
                    { game.gul[uid] === undefined || game.gul[uid].has_finished === true ? 
                    <Button onClick={()=>leaveGame()}>Leave the game</Button>:
                    <TyperPlay
                        finishHandler={finishHandler}
                        ModifyMatch={ModifyMatch}
                        text={game.text}
                    />}
                </>
            }
        </div>
    )
}

export default Match;