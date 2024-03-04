import { useEffect, useState } from "react"
import ajax from "../../services/ajax"
import { Props } from "./DataForm"

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
      <label>
        letter:
        <select
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
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
      <label>
        amount:
        <select
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
      <label>
        min syllables:
        <select
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
      <label htmlFor="maxAmountOfSyllables">
        max syllables:
        <select
          name="maxAmountOfSyllables"
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
