import { useState, useEffect } from "react"
import "./styles.scss"
import ajax from "../../services/ajax"
import Typer from "../../components/Typer/Typer"
import Loading from "../../components/Loading/Loading"

const georgianLetters = [
  "ა",
  "ბ",
  "გ",
  "დ",
  "ე",
  "ვ",
  "ზ",
  "თ",
  "ი",
  "კ",
  "ლ",
  "მ",
  "ნ",
  "ო",
  "პ",
  "ჟ",
  "რ",
  "ს",
  "ტ",
  "უ",
  "ფ",
  "ქ",
  "ღ",
  "ყ",
  "შ",
  "ჩ",
  "ც",
  "ძ",
  "წ",
  "ჭ",
  "ხ",
  "ჯ",
  "ჰ",
]
const amountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 100]
const minAmountOfSyllablesOptions = [1, 2, 3, 4, 5]
const maxAmountOfSyllablesOptions = [1, 2, 3, 4, 5]

const FakeWordsPage = () => {
  const [letter, setLetter] = useState<string>("ა")
  const [amount, setAmount] = useState<number>(100)
  const [minAmountOfSyllables, setMinAmountOfSyllables] = useState<number>(1)
  const [maxAmountOfSyllables, setMaxAmountOfSyllables] = useState<number>(5)

  const [fetchedText, setFetchedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchLesson = async () => {
      const response = await ajax.get(
        `/lesson/fakewords?letter=${letter}&amount=${amount}&minAmountOfSyllables=${minAmountOfSyllables}&maxAmountOfSyllables=${maxAmountOfSyllables}`
      )
      setFetchedText(response.data.data)
    }

    fetchLesson()
    setIsLoading(false)
  }, [letter, amount, minAmountOfSyllables, maxAmountOfSyllables])

  return (
    <div className="page fake-words-page">
      <div className="select-list">
        <label>
          letters:
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
        <label>
          max syllables:
          <select
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

      {isLoading || !fetchedText ? (
        <Loading />
      ) : (
        <Typer
          wordSeparator="•"
          text={fetchedText}
        />
      )}
    </div>
  )
}

export default FakeWordsPage
