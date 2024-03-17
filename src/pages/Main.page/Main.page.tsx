import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"

import MainPageText from "./MainPageText"

const MainPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main page" })

  const renderOptions = () => {
    return (
      <div className="options">
        <Link
          className="border shadow"
          to="lessons"
        >
          <p>{t("lessons")}</p>
          <span>{t("lessons message")}</span>
        </Link>
        <Link
          to="play"
          className="border shadow"
        >
          <p>{t("competition")}</p>
          <span>{t("competition message")}</span>
        </Link>
        <div className="separate">
          <Link
            to="games"
            className="border shadow"
          >
            <p>{t("games")}</p>
            <span>{t("games message")}</span>
          </Link>
          <Link
            to="practice"
            className="border shadow"
          >
            <p>{t("practice")}</p>
            <span>{t("practice message")}</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="main-page">
      <div className="main-content">
        <div className="page">
          <MainPageText />
          {renderOptions()}
        </div>
      </div>
    </div>
  )
}
export default MainPage
