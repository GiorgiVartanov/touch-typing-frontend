import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"

import MainPageText from "./MainPageText"
import PageLayout from "../../layout/Page.layout/Page.layout"

const MainPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main page" })

  const renderOptions = () => {
    return (
      <div className="options">
        <Link to="lessons">
          <p>{t("lessons")}</p>
          <span>{t("lessons message")}</span>
        </Link>
        <Link to="create">
          <p>{t("create")}</p>
          <span>{t("create message")}</span>
        </Link>
        <div className="separate">
          <Link to="games">
            <p>{t("games")}</p>
            <span>{t("games message")}</span>
          </Link>
          <Link to="play">
            <p>{t("competition")}</p>
            <span>{t("competition message")}</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PageLayout className="main-page">
      <div className="main-content">
        <MainPageText />
        {renderOptions()}
      </div>
    </PageLayout>
  )
}
export default MainPage
