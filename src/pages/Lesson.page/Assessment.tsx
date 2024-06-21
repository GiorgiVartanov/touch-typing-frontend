import { useEffect, useState } from "react"
import TyperArea from "../../components/TypingArea/TypingArea"
import ajax from "../../services/ajax"
import Loading from "../../components/Loading/Loading"

interface Props {
  assessment_level: number
}

const Assessment = ({ assessment_level }: Props) => {
  const [assessmentText, setExerciseText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)

    const fetchMatch = async () => {
      console.log(assessment_level)
      const response = await ajax.get(`/lesson/assessment?assessment_level=${assessment_level}`)

      setExerciseText(response.data)
    }
    fetchMatch()

    setIsLoading(false)
  }, [])

  if (isLoading) return <Loading />

  return (
    <TyperArea
      text={assessmentText}
      textLanguage="Geo"
      wordSeparator=" "
      handleTextFinish={() => {}}
    />
  )
}

export default Assessment
