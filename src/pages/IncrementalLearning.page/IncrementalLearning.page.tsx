import { useEffect, useState } from "react"
import ajax from "../../services/ajax"
import Typer from "../../components/Typer/Typer"
import Loading from "../../components/Loading/Loading"
import "./styles.scss"

const georgianLettersByFrequency = ["ა","ი","ე","ს","რ","მ","ო","დ","ვ","ნ","ლ","ბ","უ","თ","გ","ხ","შ","ც","კ","ტ","ქ","ყ","ზ","წ","ფ","ჩ","ღ","პ","ძ","ჯ","ჭ","ჰ","ჟ"]

const defaultStarterLetters = georgianLettersByFrequency.slice(0, 5)

const IncrementalLearningPage = () => {
  const [activeLetterSyllablesText, setActiveLetterSyllablesText] = useState<string>("")
  const [activeLetter, setActiveLetter] = useState<string>(
    defaultStarterLetters[defaultStarterLetters.length - 1]
  )
  const [amount, setAmount] = useState<number>(20)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const activeLetterIndex: number = georgianLettersByFrequency.indexOf(activeLetter)

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)

    setActiveLetterSyllablesText("")

    try {
      const fetchSyllables = async () => {
        const response = await ajax.get(
          `/lesson/fakewordsIncremental?activeletter=${activeLetter}&amount=${amount}`
        )
        setActiveLetterSyllablesText(response.data.data)
      }

      fetchSyllables()
    } catch (error) {
      console.error("Error fetching data:", error)
      setIsError(true)
    }

    setIsLoading(false)
  }, [activeLetter, amount])

  const renderTyper = () => {
    if (isLoading || !activeLetterSyllablesText) return <Loading />

    if (isError) {
      return (
        <div>
          Something went wrong, check browser console for more detailed
          information
        </div>
      )
    }

    return <Typer wordSeparator="•" text={activeLetterSyllablesText} />
  }

  const handleLetterClick = (letter: string, index: number) => {
    index < defaultStarterLetters.length
      ? setActiveLetter(defaultStarterLetters[defaultStarterLetters.length - 1])
      : setActiveLetter(letter)
  }

  return (
    <div className="page incremental-learning-page">
      <div className="letters-diplay-container">
        {georgianLettersByFrequency.map((letter: string, index: number) => (
          <div
            className={`letter 
              ${index <= activeLetterIndex && "activated-learning-letter"} 
              ${index == activeLetterIndex && "active-learning-letter"}`}
            key={letter}
            onClick={() => handleLetterClick(letter, index)}
          >
            {letter}
          </div>
        ))}
      </div>

      {renderTyper()}
    </div>
  )
}

export default IncrementalLearningPage
