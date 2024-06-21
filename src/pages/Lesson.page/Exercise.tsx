import { useEffect, useState } from "react"
import TyperArea from "../../components/TypingArea/TypingArea"
import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"

interface props {
  letter: string
}

const Exercise = ({ letter }: props) => {
  const [exerciseText, setExerciseText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchMatch = async () => {
      console.log(letter)
      const response = await ajax.get(`/lesson/exercise?letter=${letter}`)

      setExerciseText(response.data)
    }
    fetchMatch()

    setIsLoading(false)
  }, [])

  if (isLoading) return <Loading />

  return (
    <TyperArea
      text={exerciseText}
      textLanguage="Geo"
      wordSeparator=" "
      handleTextFinish={() => {}}
    />
  )
}

export default Exercise
