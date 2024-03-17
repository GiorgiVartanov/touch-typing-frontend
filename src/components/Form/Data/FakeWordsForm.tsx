import { useEffect, useState } from "react"
import ajax from "../../../services/ajax"
import { Props } from "./DataForm"
import { useTranslation } from "react-i18next"

const georgianLetters = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split("")
const amountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 100]
const minAmountOfSyllablesOptions = [1, 2, 3, 4, 5]
const maxAmountOfSyllablesOptions = [1, 2, 3, 4, 5]

export interface TextRequestFake {
  type?: string
  letter: string
  amount: number
  minAmountOfSyllables: number
  maxAmountOfSyllables: number
}

interface fakeWordsProps extends Props {
  setTextRequest: (req: TextRequestFake) => void
}

const FakeWordsForm = ({
  setFetchedData,
  setLoading,
  setError,
  setTextRequest,
}: fakeWordsProps) => {
  const [letter, setLetter] = useState<string>("ა")
  const [amount, setAmount] = useState<number>(5)
  const [minAmountOfSyllables, setMinAmountOfSyllables] = useState<number>(1)
  const [maxAmountOfSyllables, setMaxAmountOfSyllables] = useState<number>(1)
  const { t } = useTranslation("translation", { keyPrefix: "forms" })

  useEffect(() => {
    if (setLoading) setLoading(true)
    if (setError) setError(false)

    setFetchedData("")

    try {
      const fetchLesson = async () => {
        const response = await ajax.get(
          `/practice/fakewords?letter=${letter}&amount=${amount}&minAmountOfSyllables=${minAmountOfSyllables}&maxAmountOfSyllables=${maxAmountOfSyllables}`
        )

        setFetchedData(response.data.data)
      }

      fetchLesson()
    } catch (error) {
      console.error("Error fetching data:", error)
      if (setError) setError(true)
    }

    if (setLoading) setLoading(false)

    setTextRequest({
      type: "FakeWords",
      letter: letter,
      amount: amount,
      minAmountOfSyllables: minAmountOfSyllables,
      maxAmountOfSyllables: maxAmountOfSyllables,
    })
  }, [letter, amount, minAmountOfSyllables, maxAmountOfSyllables])

  return (
    <div className="select-list">
      <label htmlFor="letterFW_id">
        {t("Letter")}:
        <select
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          id={"letterFW_id"}
        >
          {georgianLetters.map((letter) => (
            <option
              key={letter}
              value={letter}
            >
              {letter}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="amountFW_id">
        {t("Amount")}:
        <select
          id={"amountFW_id"}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        >
          {amountOptions.map((number) => (
            <option
              key={number}
              value={number}
            >
              {number}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="min_syllablesFW_id">
        {t("Min syllables")}:
        <select
          id={"min_syllablesFW_id"}
          value={minAmountOfSyllables}
          onChange={(e) => setMinAmountOfSyllables(Number(e.target.value))}
        >
          {minAmountOfSyllablesOptions.map((number) => (
            <option
              key={number}
              value={number}
            >
              {number}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="max_syllablesFW_id">
        {t("Max syllables")}:
        <select
          id={"max_syllablesFW_id"}
          value={maxAmountOfSyllables}
          onChange={(e) => setMaxAmountOfSyllables(Number(e.target.value))}
        >
          {maxAmountOfSyllablesOptions.map((number) => (
            <option
              key={number}
              value={number}
            >
              {number}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default FakeWordsForm
