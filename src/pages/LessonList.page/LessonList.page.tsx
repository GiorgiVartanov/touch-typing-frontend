import { useState, useEffect } from "react"

import "./styles.scss"

import { LessonsApiResponse } from "../../types/typing.types"
import ajax from "../../services/ajax"

import LessonCardList from "./LessonCardList"
import LessonStats from "./LessonStats"
import SearchBar from "../../components/SearchBar/SearchBar"
import Loading from "../../components/Loading/Loading"
import AddNewLessonModal from "./AddNewLessonModal"

// page
const LearnPage = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  // const [error, setErrorMessage] = useState()

  const [data, setData] = useState<LessonsApiResponse | null>({
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

  // opens modal
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // closes modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  if (isLoading || !data) return <Loading />

  return (
    <div className="page lesson-list-page">
      <SearchBar
        value={searchValue}
        handleTextChange={handleTextChange}
      />
      <AddNewLessonModal
        isVisible={isModalOpen}
        closeModal={handleCloseModal}
      />
      <div className="lesson-page-body">
        <div className="lesson-lists">
          <LessonCardList
            lessonList={data?.Beginner}
            id="Beginner"
            sectionName="Beginner"
          />
          <LessonCardList
            lessonList={data?.Intermediate}
            id="Intermediate"
            sectionName="Intermediate"
          />
          <LessonCardList
            lessonList={data?.Expert}
            id="Expert"
            sectionName="Expert"
          />
          <LessonCardList
            lessonList={data?.Advanced}
            id="Advanced"
            sectionName="Advanced"
          />
        </div>
        <LessonStats
          lessonsAmount={{
            Beginner: data.Beginner.length,
            Intermediate: data.Intermediate.length,
            Expert: data.Expert.length,
            Advanced: data.Advanced.length,
          }}
          openModal={handleOpenModal}
        />
      </div>
    </div>
  )
}
export default LearnPage
