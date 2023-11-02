import { useState, useEffect } from "react"

import "./styles.scss"

import { LessonResponseType } from "../../types/lesson.types"
import ajax from "../../services/ajax"

import LessonCardList from "./LessonCardList"
import LessonStats from "./LessonStats"
import SearchBar from "../../components/SearchBar/SearchBar"
import Loading from "../../components/Loading/Loading"

const LearnPage = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [error, setErrorMessage] = useState()

  const [data, setData] = useState<LessonResponseType | null>({
    Beginner: [],
    Intermediate: [],
    Advanced: [],
    Expert: [],
  })

  useEffect(() => {
    setIsLoading(true)

    const fetchLessons = async () => {
      const response = await ajax.get(`/lesson/search?text=${searchValue}`)

      setData(response.data.data)
    }
    fetchLessons()

    setIsLoading(false)
  }, [searchValue])

  // console.log(data)

  const handleTextChange = (newText: string) => {
    setSearchValue(newText)
  }

  if (isLoading || !data) return <Loading />

  return (
    <div className="page lesson-list-page">
      <SearchBar
        value={searchValue}
        handleTextChange={handleTextChange}
      />

      <div className="lesson-page-body">
        <div className="lesson-lists">
          <LessonCardList
            lessonList={data?.Beginner}
            id="Beginner"
            name="Beginner"
          />
          <LessonCardList
            lessonList={data?.Intermediate}
            id="Intermediate"
            name="Intermediate"
          />
          <LessonCardList
            lessonList={data?.Expert}
            id="Expert"
            name="Expert"
          />
          <LessonCardList
            lessonList={data?.Advanced}
            id="Advanced"
            name="Advanced"
          />
        </div>
        <LessonStats />
      </div>
    </div>
  )
}
export default LearnPage
