import { useState, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"
import { SearchOptions } from "../../types/other.types"
import { Text } from "../../types/practiceText.types"
import { getPracticeTexts } from "../../services/practiceText"

import TextCardList from "./components/PracticeTextCardList"
import SearchBar from "../../components/SearchBar/SearchBar"
import Loading from "../../components/Loading/Loading"
import AddNewLessonModal from "./components/AddNewPracticeTextModal"
import PageLayout from "../../layout/Page.layout/Page.layout"

// page
const PracticeTextListPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "practice" })

  const [searchValue, setSearchValue] = useState<string>("")
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    level: "Any",
    author: null,
    textLength: {
      from: null,
      to: null,
    },
    written: { from: null, to: null },
    added: { from: null, to: null },
  })

  const [isAddTextModalOpen, setIsAddTextModalOpen] = useState<boolean>(false)

  const { user } = useAuthStore()
  const isAdmin = user?.accountType === "Admin"

  const fetchPracticeTexts = async ({
    pageParam = 0,
  }): Promise<{
    data: Text[]
    pagination: {
      totalPages: number
      currentPage: number
      nextPage: number | undefined
      hasNextPage: boolean
    }
  } | null> => {
    const response = await getPracticeTexts(searchValue, searchOptions, pageParam)

    return response.data
  }

  // fetches text cards. fetches more when fetchNextPage is called
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: fetchPracticeTexts,
      queryKey: ["practice texts", searchOptions, searchValue],
      getNextPageParam: (lastPage) => {
        return lastPage?.pagination?.nextPage
      },
      initialPageParam: 0,
      staleTime: 1000000,
    })

  // user changed search value
  const handleTextChange = (newText: string) => {
    setSearchValue(newText)
  }

  // opens AddNewTextModal, where user can add new text (only for Admin)
  const handleOpenAddNewTextModal = () => {
    setIsAddTextModalOpen(true)
  }

  // closes AddNewTextModal
  const handleCloseAddNewTextModal = () => {
    setIsAddTextModalOpen(false)
  }

  // renders fetched texts
  const renderTexts = () => {
    if (isLoading) return <Loading />

    if (error || !data?.pages) {
      return <div>{error?.message || "something went wrong"}</div>
    }

    const pagesData = data.pages.reduce<Text[]>(
      (allPages, page) => [...allPages, ...(page?.data ?? [])],
      []
    )

    return (
      <div className="text-page-body">
        <div className="text-lists">
          <TextCardList
            textList={pagesData}
            showAddNewTextButton={isAdmin}
            addNewTextModal={handleOpenAddNewTextModal}
          />
        </div>
      </div>
    )
  }

  // handles scrolling and checks if user reached the bottom
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight)

    if (distanceFromBottom <= 350 && hasNextPage !== false && !isFetchingNextPage && !isFetching) {
      fetchNextPage()
    }
  }

  // adds an event listener for scrolling when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      // removes an event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasNextPage, isFetchingNextPage, isFetching])

  return (
    <PageLayout className="text-list-page">
      <div className="search-panel">
        <SearchBar
          value={searchValue}
          placeholder={t("search")}
          handleTextChange={handleTextChange}
        />
        <div className="search-options-button-list"></div>
      </div>
      <AddNewLessonModal
        isVisible={isAddTextModalOpen}
        closeModal={handleCloseAddNewTextModal}
      />
      {renderTexts()}
    </PageLayout>
  )
}
export default PracticeTextListPage
