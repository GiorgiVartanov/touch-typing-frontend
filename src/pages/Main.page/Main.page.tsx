import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import getRandomMotivationalPhrase from "../../util/getRandomMotivationalPhrase"

import "./styles.scss"

import MainPageText from "./MainPageText"
import MainPageKeyboard from "./MainPageKeyboard"

const MainPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "main page" })

  const renderOptions = () => {
    return (
      <div className="options">
        <Link
          className="border shadow"
          to="lessons"
        >
          <p>Lessons</p>
          <span>learn typing by completing tasks</span>
        </Link>
        <Link
          to="play"
          className="border shadow"
        >
          <p>Competition</p>
          <span>challenge other people</span>
        </Link>
        <div className="separate">
          <Link
            to="games"
            className="border shadow"
          >
            <p>Games</p>
            <span>play games</span>
          </Link>
          <Link
            to="practice"
            className="border shadow"
          >
            <p>Practice</p>
            <span>type texts</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="main-page">
      <div className="main-content">
        <div className="background-image"></div>
        <div className="page">
          {showKeyboard ? <MainPageText /> : null}
          {renderOptions()}
        </div>
      </div>
    </div>
  )
}
export default MainPage
