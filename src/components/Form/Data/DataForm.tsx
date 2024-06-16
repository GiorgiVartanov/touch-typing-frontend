import { useEffect, useState } from "react"
import FakeWordsForm from "./FakeWordsForm"
import Loading from "../../Loading/Loading"
import CorpusForm from "./CorpusForm"
import Form from "../../../components/Form/Form"
import Input from "../../../components/Form/Input"
import { useTranslation } from "react-i18next"

import "./styles.scss"
import Button from "../../Form/Button"
import SentencesForm from "./SentencesForm"
import { RequestProps } from "../../../types/play.types"

type TextGenMode = "FakeWords" | "CorpusWords" | "Sentences" //FakeWords, Corpus Words,
const TextGenModes = ["FakeWords", "CorpusWords", "Sentences"]
const TextGenModesText: { [key: string]: string } = {
  FakeWords: "Fake words",
  CorpusWords: "Corpus words",
  Sentences: "Sentences",
}

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
  CreateMatch: (req: RequestProps, time_limit: number, user_limit: number) => void
  setShowModal: (val: boolean) => void
  className?: string
}

const DataForm = ({ CreateMatch, setShowModal, className = "" }: FormProps) => {
  const [textGenerationMode, setTextGenerationMode] = useState<TextGenMode>("FakeWords")
  const [textRequest, setTextRequest] = useState<RequestProps>()
  const [fetchedData, setFetchedData] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [create, setCreate] = useState<boolean>(false)
  const [params, setParams] = useState<matchProps>(initialMatchProps)
  const { t } = useTranslation("translation", { keyPrefix: "forms" })

  useEffect(() => {
    if (!create) return

    if (create === true) {
      if (textRequest != undefined) {
        CreateMatch(textRequest, params.time_limit, params.user_limit)
        setCreate(false)
      }
    }
  }, [create])

  if (loading) return <Loading />
  if (error)
    return <div>Something went wrong, check browser console for more detailed information</div>

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreate(true) //CreateMatch(params.text, params.time_limit, params.user_limit) //text.params property isn't updated right away :@
  }

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
      className={`match_form ${className}`}
    >
      <div className="basic">
        <Input
          name={t("User limit")}
          onChange={handleUserLimitChange}
          value={String(params.user_limit)}
        />
        <Input
          name={t("Time limit")}
          onChange={handleTimeLimitChange}
          value={String(params.time_limit)}
        />
      </div>
      <div className="textGen">
        <label>
          {t("Text generation options")}
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
                {t(TextGenModesText[mode])}
              </option>
            ))}
          </select>
        </label>
        {textGenerationMode === "FakeWords" ? (
          <FakeWordsForm {...{ setFetchedData, setLoading, setError, setTextRequest }} />
        ) : textGenerationMode === "CorpusWords" ? (
          <CorpusForm {...{ setFetchedData, setLoading, setError, setTextRequest }} />
        ) : textGenerationMode === "Sentences" ? (
          <SentencesForm
            {...{ setFetchedData, setLoading, setError, setTextRequest }}
          ></SentencesForm>
        ) : (
          <></>
        )}

        <div className="example">
          <p className="sample-text-title">{t("Sample text")}:</p>
          <p className="sample-text">
            {fetchedData.length > 200 ? fetchedData.substring(0, 200) + "..." : fetchedData}
          </p>
        </div>
        <div className="but">
          <Button
            className=""
            {...{ type: "submit" }}
          >
            {t("Create")}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default DataForm
