import { useEffect, useState } from "react"
import Button from "../../components/Form/Button"
import { usePlayStore } from "../../store/context/playContext"
import PlayGamesList from "./PlayGamesList"
import "./styles.scss"
import { useNavigate } from "react-router-dom"
import Form from "../../components/Form/Form"
import Input from "../../components/Form/Input"
import ajax from "../../services/ajax"

interface gameProps {
  text: string
  time_limit: number
  user_limit: number
}

const initialGameProps: gameProps = {
  text: "საზოგადოდ, ტექსტის მეტი არჩევანი ექნებათ",
  time_limit: 30,
  user_limit: 2,
}

type TextGenMode = "F" | "C" | "H" //FakeWords, Corpus, Hand (by hand)
const TextGenModes = ["F", "C", "H"]

const PlayPage = () => {
  const { users, game_id, games, CreateGame, JoinGame } = usePlayStore()
  const [params, setParams] = useState<gameProps>(initialGameProps)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [textGenerationMode, setTextGenerationMode] = useState<TextGenMode>("F")
  const [create, setCreate] = useState<boolean>(false)
  const navigate = useNavigate()

  const clickHandler = (game_id: string) => {
    JoinGame(game_id)
  }

  const clickCreateGameHandler = () => {
    setShowModal(true)
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (textGenerationMode === "F") {
      const response = await ajax.get(
        `/lesson/fakewords?amount=${10}&minAmountOfSyllables=${1}&maxAmountOfSyllables=${4}`
      )
      setParams((prevState) => ({
        ...prevState,
        text: response.data.data,
      }))
    }
    setCreate(true) //CreateGame(params.text, params.time_limit, params.user_limit) //text.params property isn't updated right away :@
  }

  useEffect(() => {
    if (create === true) {
      CreateGame(params.text, params.time_limit, params.user_limit)
      setCreate(false)
    }
  }, [create])

  //here should work without [game_id], right? couldn't make it work...
  useEffect(() => {
    console.log(games)
    if (game_id) navigate(`./${game_id}`)
  }, [game_id])

  const handleUserLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevState) => ({
      text: prevState.text,
      user_limit: Number(e.target.value),
      time_limit: prevState.time_limit,
    }))
  }

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevState) => ({
      text: prevState.text,
      user_limit: prevState.user_limit,
      time_limit: Number(e.target.value),
    }))
  }

  return (
    <>
      {showModal ? (
        <div className="page modal">
          <div className="please-work">
            <h1>Create your very own game! o_o</h1>
            <Form onSubmit={submitHandler}>
              <div className="basic">
                <h2 key={1}>user limit:</h2>
                <Input
                  name="user_limit"
                  onChange={handleUserLimitChange}
                  value={String(params.user_limit)}
                />
                <h2 key={2}>time limit:</h2>
                <Input
                  name="time_limit"
                  onChange={handleTimeLimitChange}
                  value={String(params.time_limit)}
                />
              </div>
              <div className="textGen">
                <label>
                  Generation Options:
                  <select
                    value={textGenerationMode}
                    onChange={(e) => setTextGenerationMode(e.target.value as TextGenMode)}
                  >
                    {TextGenModes.map((mode) => (
                      <option
                        key={mode}
                        value={mode}
                      >
                        {mode}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="but">
                <Button
                  onClick={() => setShowModal(false)}
                  {...{ type: "button" }}
                >
                  Back
                </Button>
                <Button {...{ type: "submit" }}>Create</Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="page play">
          <h2 className="play-head">Active users: {users.length}</h2>
          <div className="play-body">
            <PlayGamesList
              games={games}
              onClick={clickHandler}
            />
            <div className="play-create">
              {/*აქ იქნება gameSetting Modal*/}
              <Button onClick={clickCreateGameHandler}>create a game</Button>
              <Button onClick={() => navigate("../game")}>Game History</Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PlayPage
