import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import getRandomMotivationalPhrase from "../../util/getRandomMotivationalPhrase"

import "./styles.scss"

import MainPageText from "./MainPageText"
import MainPageKeyboard from "./MainPageKeyboard"

const MainPage = () => {
  const [showKeyboard, setShowKeyboard] = useState(window.innerWidth >= 1000)

  // const handleOnButtonHover = (buttonName: string) => {
  //   setActiveKeys(buttonName.split(""))
  // }

  // const handleOnMouseLeave = () => {
  //   setActiveKeys([])
  // }

  const renderOptions = () => {
    return (
      <div className="options">
        <Link
          className="border shadow"
          to="lessons"
          // onMouseEnter={() => {
          //   handleOnButtonHover("lessons")
          // }}
          // onMouseLeave={handleOnMouseLeave}
        >
          <p>Lessons</p>
          <span>learn typing by completing tasks</span>
        </Link>
        <Link
          to="play"
          // onMouseEnter={() => {
          //   handleOnButtonHover("online competition")
          // }}
          // onMouseLeave={handleOnMouseLeave}
          className="border shadow"
        >
          <p>Competition</p>
          <span>challenge other people</span>
        </Link>
        <div className="separate">
          <Link
            to="games"
            // onMouseEnter={() => {
            //   handleOnButtonHover("games")
            // }}
            // onMouseLeave={handleOnMouseLeave}
            className="border shadow"
          >
            <p>Games</p>
            <span>play games</span>
          </Link>
          <Link
            to="practice"
            // onMouseEnter={() => {
            //   handleOnButtonHover("practice")
            // }}
            // onMouseLeave={handleOnMouseLeave}
            className="border shadow"
          >
            <p>Practice</p>
            <span>type texts</span>
          </Link>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // updates the showHeroKeyboard state when the window is resized
    const handleResize = () => {
      setShowKeyboard(window.innerWidth >= 1000)
    }

    // adds a listener for the window resize event
    window.addEventListener("resize", handleResize)

    // removes the listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

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
