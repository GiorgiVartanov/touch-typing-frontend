import { useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"
import { getLayouts } from "../../services/keyboardServices"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"

import PageLayout from "../../layout/Page.layout/Page.layout"
import SearchBar from "../../components/SearchBar/SearchBar"
import Loading from "../../components/Loading/Loading"
import LayoutCardList from "./LayoutCardList"

const LayoutSelectPage = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Geo")

  const { t } = useTranslation("translation", { keyPrefix: "layout page" })

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
      staleTime: 0,
    })

  const renderLayouts = () => {
    if (isLoading) return <Loading />

    if (error || !data?.pages) {
      return <div>{error?.message || t("something went wrong")}</div>
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
        {officialLayouts?.length > 0 ? (
          <div className="layout-lists">
            <h2 className="layout-list-title">{t("standard layouts")}</h2>
            <LayoutCardList layouts={officialLayouts} />
          </div>
        ) : null}
        {nonOfficialLayouts?.length > 0 ? (
          <div className="layout-lists">
            <h2 className="layout-list-title">{t("layouts created by our users")}</h2>
            <LayoutCardList layouts={nonOfficialLayouts} />
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <PageLayout className="layout-select-page">
      <SearchBar
        value={searchValue}
        placeholder={t("search")}
        handleTextChange={handleTextChange}
      />

      <div className="search-options-button-list">
        <div className="search-options-list">
          <Link
            to="../create"
            className="create-layout-link button"
          >
            {t("create your own layout")}
          </Link>
        </div>
      </div>
      {renderLayouts()}
    </PageLayout>
  )
}

export default LayoutSelectPage
