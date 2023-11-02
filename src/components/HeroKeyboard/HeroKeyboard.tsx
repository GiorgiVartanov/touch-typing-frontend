import { useState, useEffect } from "react"

import "./styles.scss"

const layouts: { name: string; keys: string[][] }[] = [
  {
    name: "geo-eng",
    keys: [
      ["qქ", "wწ", "eე", "rრღ", "tტთ", "yყ", "uუ", "iი", "oო", "pპ"],
      ["aა", "sსშ", "dდ", "fფ", "gგ", "hჰ", "jჯჟ", "kკ", "lლ"],
      ["zზძ", "xხ", "cცჩ", "vვ", "bბ", "nნ", "mმ"],
    ],
  },
  {
    name: "eng",
    keys: [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      ["z", "x", "c", "v", "b", "n", "m"],
    ],
  },
  {
    name: "geo",
    keys: [
      ["ღ", "ჯ", "უ", "კ", "ე", "ნ", "გ", "შ", "წ", "ზ", "ხ", "ც"],
      ["ფ", "ძ", "ვ", "თ", "ა", "პ", "რ", "ო", "ლ", "დ", "ჟ"],
      ["ჭ", "ჩ", "ყ", "ს", "მ", "ი", "ტ", "ქ", "გ", "ჰ"],
    ],
  },
]

interface Props {
  activeKeys: string[]
}

const HeroKeyboard = ({ activeKeys }: Props) => {
  const [currentLayout, setCurrentLayout] = useState<string>("geo-eng")
  const [pressedKeys, setPressedKeys] = useState<string[]>([])

  const renderKeyboard = () => {
    const layoutToRender = layouts.find((layout) => layout.name === currentLayout)?.keys

    return layoutToRender?.map((row, index) => renderRow(row, index))
  }

  // adds pressed key to the array of active keys for 500ms, then removes it
  const addKeyToActiveKeys = (newKey: string) => {
    setPressedKeys((prevState) => [...prevState, newKey])

    setTimeout(() => {
      setPressedKeys((prevState) => prevState.filter((key) => key !== newKey))
    }, 500)
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
    <div className="keyboard">
      <div className="keyboard-container">
        <div className="container">{renderKeyboard()}</div>
        <div className="select-layout-buttons">
          {/* <button
            onClick={() => {
              setCurrentLayout("geo-eng")
            }}
          >
            geo-en
          </button>
          <button
            onClick={() => {
              setCurrentLayout("eng")
            }}
          >
            eng
          </button> */}
          {/* <button
            onClick={() => {
              setCurrentLayout("geo")
            }}
          >
            geo
          </button> */}
        </div>
      </div>
    </div>
  )
}
export default HeroKeyboard
