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
  user_limit: 3,
}

const PlayPage = () => {
  const {uid, users, game_id, games, CreateGame, JoinGame} = usePlayStore()
  const [params, setParams] = useState<gameProps>(initialGameProps);
  const [showModal, setShowModal] = useState<boolean>(false)
  const navigate = useNavigate();

  const clickHandler = (game_id: string) => {    
    JoinGame(game_id);
  }

  if(game_id){
    navigate(`./${game_id}`)
  }

  return (
    <>
      {
        // game_id !== undefined ? <Match/> :
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
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PlayPage
