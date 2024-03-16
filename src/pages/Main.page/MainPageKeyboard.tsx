import { useState, useEffect } from "react"

import "./styles.scss"

const layout = [
  ["qქ", "wწ", "eე", "rრღ", "tტთ", "yყ", "uუ", "iი", "oო", "pპ"],
  ["aა", "sსშ", "dდ", "fფ", "gგ", "hჰ", "jჯჟ", "kკ", "lლ"],
  ["zზძ", "xხ", "cცჩ", "vვ", "bბ", "nნ", "mმ"],
]

interface Props {
  activeKeys: string[]
}

const MainPageKeyboard = ({ activeKeys }: Props) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  const renderKeyboard = () => {
    return layout.map((row, index) => renderRow(row, index))
  }

  // adds pressed key to the array of active keys for 500ms, then removes it
  const addKeyToActiveKeys = (newKey: string) => {
    setPressedKeys((prevState) => [...prevState, newKey])

    setTimeout(() => {
      setPressedKeys((prevState) => prevState.filter((key) => key !== newKey))
    }, 1000)
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    const pressedKey = event.key

    addKeyToActiveKeys(pressedKey)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  const renderRow = (row: string[], index: number) => {
    return (
      <div
        className="row"
        key={index}
      >
        {row.map((key, index) => {
          const keys = key.split("")
          const isActive = keys.some(
            (part) => activeKeys.includes(part) || pressedKeys.includes(part)
          )

          return (
            <div
              key={key}
              className={`key ${isActive ? "active" : ""} children-${keys.length}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {keys.length > 0 ? (
                keys.map((part, index) => <span key={index}>{part}</span>)
              ) : (
                <span>{key}</span>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className="keyboard"
      aria-label="Visual Keyboard"
    >
      <div className="keyboard-container">
        <div className="container">{renderKeyboard()}</div>
      </div>
    </div>
  )
}
export default MainPageKeyboard
