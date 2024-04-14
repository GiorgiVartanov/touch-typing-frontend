import { useState } from "react"

import getRandomMotivationalPhrase from "../../util/getRandomMotivationalPhrase"

import TypingArea from "../../components/TypingArea/TypingArea"

const MainPageText = () => {
  const [text, setText] = useState<string>(getRandomMotivationalPhrase)

  const changeText = () => {
    setText((prevState) => getRandomMotivationalPhrase(prevState))
  }

  return (
    <div className="main-page-typing-area-wrapper">
      <TypingArea
        text={text}
        className="typing-area-main-page"
        handleTextFinish={changeText}
        showKeyboard={false}
      />
    </div>
  )
}
export default MainPageText
