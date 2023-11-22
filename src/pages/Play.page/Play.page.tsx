import { useEffect, useState } from "react";
import Button from "../../components/Form/Button";
import { usePlayStore } from "../../store/context/playContext";
import PlayGamesList from "./PlayGamesList";
import "./styles.scss"
import { useNavigate } from "react-router-dom";

interface gameProps {
  text: string,
  time_limit: number, 
  user_limit: number,
}

const initialGameProps = {
  text: "საზოგადოდ, ტექსტის მეტი არჩევანი ექნებათ",
  time_limit: 30, 
  user_limit: 2,
}

const PlayPage = () => {
  const {users, game_id, games, CreateGame, JoinGame} = usePlayStore()
  const [params, setParams] = useState<gameProps>(initialGameProps);
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigate = useNavigate();

  const clickHandler = (game_id: string) => {    
    JoinGame(game_id);
  }

  //here should work without [game_id], right? couldn't make it work...
  useEffect(()=>{
    console.log(games)
    if(game_id)
      navigate(`./${game_id}`)  
  }, [game_id])


  return (
    <>
      {
        <div className="page play">
          <h2 className="play-head">Active users: {users.length}</h2>
          <div className="play-body">
            <PlayGamesList
              games={games}
              onClick={clickHandler}
            />
            <div className="play-create">
              {/*აქ იქნება gameSetting Modal*/}
              <Button onClick={() => CreateGame(params.text, params.time_limit, params.user_limit)}>
                create a game
              </Button>
              <Button onClick={()=>navigate("../game")}>
                Game History
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PlayPage
