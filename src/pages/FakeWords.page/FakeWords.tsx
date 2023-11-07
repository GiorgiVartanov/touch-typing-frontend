import { useState, useEffect } from "react"
import "./styles.scss"
import ajax from "../../services/ajax"

import Typer from "../../components/Typer/Typer"
import Loading from "../../components/Loading/Loading"

// options for selects
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

// page
// temporary (was created as an example)
// renders settings for selecting params for fetching text
// fetches text with selected params
// renders them in a Typer component
const FakeWordsPage = () => {
  const [letter, setLetter] = useState<string>("ა")
  const [amount, setAmount] = useState<number>(100)
  const [minAmountOfSyllables, setMinAmountOfSyllables] = useState<number>(1)
  const [maxAmountOfSyllables, setMaxAmountOfSyllables] = useState<number>(5)

  const [fetchedText, setFetchedText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    setFetchedText("")

    try {
      const fetchLesson = async () => {
        const response = await ajax.get(
          `/lesson/fakewords?letter=${letter}&amount=${amount}&minAmountOfSyllables=${minAmountOfSyllables}&maxAmountOfSyllables=${maxAmountOfSyllables}`
        )

        setFetchedText(response.data.data)
      }

      fetchLesson()
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsError(true)
    }

    setIsLoading(false)
  }, [letter, amount, minAmountOfSyllables, maxAmountOfSyllables])

  // returns Loading component while data is fetching
  // returns error message if data was not fetched (due to some error)
  const renderTyper = () => {
    if (isLoading || !fetchedText) return <Loading />

    if (isError) {
      return <div>Something went wrong, check browser console for more detailed information</div>
    }

    return (
      <Typer
        wordSeparator="•"
        text={fetchedText}
      />
    )
  }

  return (
    <div className="page fake-words-page">
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
      {renderTyper()}
    </div>
  )
}

export default FakeWordsPage
