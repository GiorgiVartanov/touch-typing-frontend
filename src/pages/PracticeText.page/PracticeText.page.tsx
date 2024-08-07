import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import "./styles.scss"

import { Text } from "../../types/practiceText.types"
import { getPracticeText } from "../../services/practiceText"

import TypingArea from "../../components/TypingArea/TypingArea"
import Loading from "../../components/Loading/Loading"
import PageLayout from "../../layout/Page.layout/Page.layout"
import { useTranslation } from "react-i18next"

const PracticeTextPage = () => {
  const { id } = useParams()
  const { t } = useTranslation("translation", { keyPrefix: "lesson page" })

  const fetchText = async (): Promise<{ data: Text } | null> => {
    if (!id) return null

    return await getPracticeText(id)
  }

  const { data, isLoading, error } = useQuery({
    queryFn: fetchText,
    queryKey: ["practice text", id],
  })

  const renderTypingArea = () => {
    if (isLoading || !data) return <Loading />

    if (error || !data.data) {
      return <div>{error?.message || t("something went wrong")}</div>
    }

    const { text, language, wordSeparator } = data.data

    return (
      <TypingArea
        text={text}
        textLanguage={language}
        wordSeparator={wordSeparator}
      />
    )
  }

  return <PageLayout className="practice-page">{renderTypingArea()}</PageLayout>
}
export default PracticeTextPage
