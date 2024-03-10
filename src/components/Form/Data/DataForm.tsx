import { useEffect, useState } from "react"
import FakeWordsForm, { TextRequestFake } from "./FakeWordsForm"
import Loading from "../../Loading/Loading"
import CorpusForm, { TextRequestWord } from "./CorpusForm"
import Form from "../../../components/Form/Form"
import Input from "../../../components/Form/Input"

import "./styles.scss"
import Button from "../../Form/Button"

type TextGenMode = "FakeWords" | "CorpusWords" //FakeWords, Corpus Words,
const TextGenModes = ["FakeWords", "CorpusWords"]

interface matchProps {
  text: string
  time_limit: number
  user_limit: number
}

const initialMatchProps: matchProps = {
  text: "",
  time_limit: 30,
  user_limit: 2,
}

export interface Props {
  setFetchedData: (data: string) => void
  setLoading?: (val: boolean) => void
  setError?: (err: boolean) => void
}

interface FormProps {
  CreateMatch: (
    req: TextRequestFake | TextRequestWord,
    time_limit: number,
    user_limit: number
  ) => void
  setShowModal: (val: boolean) => void
}

const DataForm = ({ CreateMatch, setShowModal }: FormProps) => {
  const [textGenerationMode, setTextGenerationMode] = useState<TextGenMode>("FakeWords")
  const [textRequest, setTextRequest] = useState<TextRequestFake | TextRequestWord>()
  const [fetchedData, setFetchedData] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [create, setCreate] = useState<boolean>(false)
  const [params, setParams] = useState<matchProps>(initialMatchProps)

  if (loading) return <Loading />
  if (error)
    return <div>Something went wrong, check browser console for more detailed information</div>

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreate(true) //CreateMatch(params.text, params.time_limit, params.user_limit) //text.params property isn't updated right away :@
  }

  useEffect(() => {
    if (create === true) {
      if (textRequest != undefined) {
        CreateMatch(textRequest, params.time_limit, params.user_limit)
        setCreate(false)
      }
    }
  }, [create])

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
    <Form
      onSubmit={submitHandler}
      className="match_form"
    >
      <div className="basic">
        <Input
          name="user limit"
          onChange={handleUserLimitChange}
          value={String(params.user_limit)}
        />
        <Input
          name="time limit"
          onChange={handleTimeLimitChange}
          value={String(params.time_limit)}
        />
      </div>
      <div className="textGen">
        <label>
          Text Generation Options:
          <select
            id={"textGen_id"}
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
        {textGenerationMode === "FakeWords" ? (
          <FakeWordsForm {...{ setFetchedData, setLoading, setError, setTextRequest }} />
        ) : textGenerationMode === "CorpusWords" ? (
          <CorpusForm {...{ setFetchedData, setLoading, setError, setTextRequest }} />
        ) : (
          <></>
        )}
        <div className="but">
          <Button
            onClick={() => setShowModal(false)}
            {...{ type: "button" }}
          >
            Back
          </Button>
          <Button {...{ type: "submit" }}>Create</Button>
        </div>
        <div className="example">
          <p>sample text:</p>
          <p>{fetchedData.length > 200 ? fetchedData.substring(0, 200) + "..." : fetchedData}</p>
        </div>
      </div>
    </Form>
  )
}

export default DataForm
