import { useState } from "react"
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

import "./styles.scss"
import { getLayouts } from "../../services/keyboardServices"
import { KeyInterface, KeyboardLayoutInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import SearchBar from "../../components/SearchBar/SearchBar"
import Loading from "../../components/Loading/Loading"
import CardList from "../../components/Card/CardList"
import LayoutCard from "./LayoutCard"
import LayoutCardList from "./LayoutCardList"

const LayoutSelectPage = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All")

  const handleTextChange = (newText: string) => {
    setSearchValue(newText)
  }

  const fetchLayouts = async ({
    pageParam = 0,
  }): Promise<{
    data: KeyboardLayoutInterface[]
    pagination: {
      totalPages: number
      currentPage: number
      nextPage: number | undefined
      hasNextPage: boolean
    }
  } | null> => {
    const response = await getLayouts(searchValue, selectedLanguage, pageParam)

    return response.data
  }

  // fetches layouts. fetches more when fetchNextPage is called
  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryFn: fetchLayouts,
      queryKey: ["keyboard layouts", searchValue, selectedLanguage],
      getNextPageParam: (lastPage) => {
        return lastPage?.pagination?.nextPage
      },
      initialPageParam: 0,
      staleTime: 1000000,
    })

  const renderLayouts = () => {
    if (isLoading) return <Loading />

    if (error || !data?.pages) {
      console.log(error?.message)

      return <div>{error?.message || "something went wrong"}</div>
    }

    const pagesData = data.pages.reduce<KeyboardLayoutInterface[]>(
      (allPages, page) => [...allPages, ...(page?.data ?? [])],
      []
    )

    const { officialLayouts, nonOfficialLayouts } = pagesData.reduce(
      (
        acc: {
          officialLayouts: KeyboardLayoutInterface[]
          nonOfficialLayouts: KeyboardLayoutInterface[]
        },
        layout: KeyboardLayoutInterface
      ) => {
        if (layout.official) {
          acc.officialLayouts.push(layout)
        } else {
          acc.nonOfficialLayouts.push(layout)
        }
        return acc
      },
      { officialLayouts: [], nonOfficialLayouts: [] }
    )

    return (
      <div className="layout-list-page-body">
        <div className="layout-lists">
          <h2 className="layout-list-title">standard layouts</h2>
          <LayoutCardList layouts={officialLayouts} />
        </div>
        <div className="layout-lists">
          <h2 className="layout-list-title">layouts created by our users</h2>
          <LayoutCardList layouts={nonOfficialLayouts} />
        </div>
      </div>
    )
  }

  return (
    <PageLayout className="layout-select-page">
      <SearchBar
        value={searchValue}
        handleTextChange={handleTextChange}
      />
      <Link
        to="../create"
        className="create-layout-link button"
      >
        Create your own layout
      </Link>
      {renderLayouts()}
    </PageLayout>
  )
}

export default LayoutSelectPage
