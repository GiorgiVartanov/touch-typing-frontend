import { useEffect, useState } from "react"
import ajax from "../../../services/ajax"
import { Props } from "./DataForm"
import Input from "../../Form/Input"
import { useTranslation } from "react-i18next"
import { TextRequestSentence } from "../../../types/play.types"

interface SentencesFormProps extends Props {
  setTextRequest: (req: TextRequestSentence) => void
}

const SentencesForm = ({
  setFetchedData,
  setLoading,
  setError,
  setTextRequest,
}: SentencesFormProps) => {
  const [amount, setAmount] = useState<Number>(10)
  const { t } = useTranslation("translation", { keyPrefix: "forms" })

  useEffect(() => {
    if (setLoading) setLoading(true)
    if (setError) setError(false)

    setFetchedData("")

    try {
      const fetchLesson = async () => {
        const response = await ajax.get(`/practice/sentences?amount=${amount}`)

        setFetchedData(
          response.data.map((el: { _id: string; sentence: string }) => el.sentence).join(". ")
        )
      }

      fetchLesson()
    } catch (error) {
      console.error("Error fetching data:", error)
      if (setError) setError(true)
    }

    if (setLoading) setLoading(false)

    setTextRequest({
      type: "Sentences",
      amount: amount,
    })
  }, [amount])

  return (
    <div className="corpus">
      <p>{t("Amount")}:</p>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (Number(e.target.value) > 0 && Number(e.target.value) < 51)
            setAmount(Number(e.target.value))
          else if (Number(e.target.value) > 50) setAmount(50)
          else setAmount(1)
        }}
        type="number"
        name=" "
        value={String(amount)}
      />
    </div>
  )
}

export default SentencesForm
