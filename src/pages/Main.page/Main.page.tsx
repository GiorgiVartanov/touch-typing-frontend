import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import "./styles.scss"

import HeroKeyboard from "../../components/HeroKeyboard/HeroKeyboard"

const MainPage = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [showHeroKeyboard, setShowHeroKeyboard] = useState(window.innerWidth >= 1000)

  const handleOnButtonHover = (buttonName: string) => {
    setActiveKeys(buttonName.split(""))
  }
  const handleOnMouseLeave = () => {
    setActiveKeys([])
  }

  useEffect(() => {
    // Update the showHeroKeyboard state when the window is resized
    const handleResize = () => {
      setShowHeroKeyboard(window.innerWidth >= 1000)
    }

    // Add a listener for the window resize event
    window.addEventListener("resize", handleResize)

    // Remove the listener when the component unmounts
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
            className="main-button"
            to="learn"
            onMouseEnter={() => {
              handleOnButtonHover("learn")
            }}
            onMouseLeave={handleOnMouseLeave}
          >
            <p>Learn</p>
            <span>learn typing by completing tasks</span>
          </Link>
          <Link
            to="play"
            onMouseEnter={() => {
              handleOnButtonHover("play online")
            }}
            onMouseLeave={handleOnMouseLeave}
          >
            <p>Play Online</p>
            <span>challenge other people</span>
          </Link>
          <div className="separate">
            <Link
              to="communities"
              onMouseEnter={() => {
                handleOnButtonHover("communities")
              }}
              onMouseLeave={handleOnMouseLeave}
            >
              <p>Communities</p>
              <span>Socialize</span>
            </Link>
            <Link
              to="practice"
              onMouseEnter={() => {
                handleOnButtonHover("practice")
              }}
              onMouseLeave={handleOnMouseLeave}
            >
              <p>Practice</p>
              <span>Practice typing</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="page"></div>
    </div>
  )
}
export default MainPage
