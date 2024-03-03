import { useState, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

import "./styles.scss"

import { useAuthStore } from "../../store/context/authContext"
import { SearchOptions } from "../../types/other.types"
import { Text } from "../../types/practiceText.types"
import { getPracticeTexts } from "../../services/practiceText"

import TrashIcon from "../../assets/icons/trash.svg?react"

import TextCardList from "./components/PracticeTextCardList"
import SearchBar from "../../components/SearchBar/SearchBar"
import Loading from "../../components/Loading/Loading"
import AddNewLessonModal from "./components/AddNewPracticeTextModal"
import PracticeTextSearchOptions from "./components/PracticeTextSearchOptions"
import Button from "../../components/Form/Button"

// page
const PracticeTextListPage = () => {
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
  const [isSearchTextModalOpen, setIsSearchTextModalOpen] = useState<boolean>(false)

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

  // opens TextSearchModal, where user can select text search options
  const handleOpenTextSearchModal = () => {
    setIsSearchTextModalOpen(true)
  }

  // closes TextSearchModal
  const handleCloseTextSearchModal = () => {
    setIsSearchTextModalOpen(false)
  }

  // sets search options to default values
  const handleClearSearchOptions = () => {
    setSearchOptions({
      level: "Any",
      author: null,
      textLength: {
        from: null,
        to: null,
      },
      written: { from: null, to: null },
      added: { from: null, to: null },
    })
  }

  // renders selected search options
  const renderSearchListItems = () => {
    const items = []

    if (searchOptions.level !== null && searchOptions.level !== "Any") {
      items.push(
        <SearchListItem
          key="level"
          name={searchOptions.level}
          removeItem={() => {
            setSearchOptions((prevState) => {
              const updatedState = { ...prevState }
              updatedState.level = null
              return updatedState
            })
          }}
        />
      )
    }

    // checks and adds length to the search items
    if (searchOptions.textLength.from !== null || searchOptions.textLength.to !== null) {
      const lengthRange = `${searchOptions.textLength.from || ""}-${
        searchOptions.textLength.to || ""
      }`
      items.push(
        <SearchListItem
          key="length"
          name={`Length: ${lengthRange}`}
          removeItem={() => {
            setSearchOptions((prevState) => {
              const updatedState = { ...prevState }
              updatedState.textLength.from = null
              updatedState.textLength.to = null
              return updatedState
            })
          }}
        />
      )
    }

    // checks and adds written to the search items
    if (searchOptions.written.from !== null || searchOptions.written.to !== null) {
      const writtenRange = `${searchOptions.written.from || ""}-${searchOptions.written.to || ""}`
      items.push(
        <SearchListItem
          key="written"
          name={`Written: ${writtenRange}`}
          removeItem={() => {
            setSearchOptions((prevState) => {
              const updatedState = { ...prevState }
              updatedState.written.from = null
              updatedState.written.to = null
              return updatedState
            })
          }}
        />
      )
    }

    // checks and adds added to the search items
    if (searchOptions.added.from !== null || searchOptions.added.to !== null) {
      const addedRange = `${searchOptions.added.from || ""}-${searchOptions.added.to || ""}`
      items.push(
        <SearchListItem
          key="added"
          name={`Added: ${addedRange}`}
          removeItem={() => {
            setSearchOptions((prevState) => {
              const updatedState = { ...prevState }
              updatedState.added.from = null
              updatedState.added.to = null
              return updatedState
            })
          }}
        />
      )
    }

    return items
  }

  // function to update search options
  const handleChangeSearchOptions = (updatedSearchOptions: SearchOptions) => {
    setSearchOptions(updatedSearchOptions)
  }

  // renders fetched texts
  const renderTexts = () => {
    if (isLoading) return <Loading />

    if (error || !data?.pages) {
      console.log(error?.message)

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
    <div className="page text-list-page">
      <SearchBar
        value={searchValue}
        handleTextChange={handleTextChange}
      />
      <div className="search-options-button-list">
        <div className="search-options-list">
          <Button
            onClick={handleOpenTextSearchModal}
            className="search-options-button cta-button"
          >
            more options
          </Button>
          {renderSearchListItems()}
          {renderSearchListItems().length > 0 ? (
            <Button
              onClick={handleClearSearchOptions}
              className="search-options-button search-options-clear"
            >
              <TrashIcon className="trash-icon" />
            </Button>
          ) : null}
        </div>
      </div>

      {/* it works, but its incorrect */}
      <PracticeTextSearchOptions
        isVisible={isSearchTextModalOpen}
        closeSearchOptions={handleCloseTextSearchModal}
        selectedSearchOptions={searchOptions}
        saveSearchOptions={handleChangeSearchOptions}
        key={JSON.stringify(searchOptions)}
      />
      <AddNewLessonModal
        isVisible={isAddTextModalOpen}
        closeModal={handleCloseAddNewTextModal}
      />
      {renderTexts()}
    </div>
  )
}
export default PracticeTextListPage

interface SearchListItemProps {
  name: string | null
  removeItem: () => void
}

const SearchListItem = ({ name, removeItem }: SearchListItemProps) => {
  if (name === null) return

  return (
    <button
      onClick={removeItem}
      className="search-list-item"
    >
      {name}
    </button>
  )
}
