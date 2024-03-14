import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"

import HeroKeyboard from "../../components/HeroKeyboard/HeroKeyboard"

const MainPage = () => {
  const { t } = useTranslation()

  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [showHeroKeyboard, setShowHeroKeyboard] = useState(window.innerWidth >= 1000)

  const handleOnButtonHover = (buttonName: string) => {
    setActiveKeys(buttonName.split(""))
  }
  const handleOnMouseLeave = () => {
    setActiveKeys([])
  }

  useEffect(() => {
    // updates the showHeroKeyboard state when the window is resized
    const handleResize = () => {
      setShowHeroKeyboard(window.innerWidth >= 1000)
    }

    // adds a listener for the window resize event
    window.addEventListener("resize", handleResize)

    // removes the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="page main-page">
      <div className="hero">
        {showHeroKeyboard ? <HeroKeyboard activeKeys={activeKeys} /> : ""}
        <div className="options">
          <Link
            className="border shadow"
            to="lessons"
            onMouseEnter={() => {
              handleOnButtonHover("lessons")
            }}
            onMouseLeave={handleOnMouseLeave}
          >
            <p>{t("lessons")}</p>
            <span>{t("lessons message")}</span>
          </Link>
          <Link
            to="play"
            onMouseEnter={() => {
              handleOnButtonHover("online competition")
            }}
            onMouseLeave={handleOnMouseLeave}
            className="border shadow"
          >
            <p>{t("competition")}</p>
            <span>{t("competition message")}</span>
          </Link>
          <div className="separate">
            <Link
              to="games"
              onMouseEnter={() => {
                handleOnButtonHover("games")
              }}
              onMouseLeave={handleOnMouseLeave}
              className="border shadow"
            >
              <p>{t("games")}</p>
              <span>{t("games message")}</span>
            </Link>
            <Link
              to="practice"
              onMouseEnter={() => {
                handleOnButtonHover("practice")
              }}
              onMouseLeave={handleOnMouseLeave}
              className="border shadow"
            >
              <p>{t("practice")}</p>
              <span>{t("practice message")}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="page"></div>
    </div>
  )
}
export default MainPage
