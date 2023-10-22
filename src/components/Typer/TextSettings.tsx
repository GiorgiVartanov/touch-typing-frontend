// fixed issue with importing svg file as a component

import { useState, useRef } from "react"

import { FontType } from "./Text"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"

import SettingsIcon from "../../assets/icons/gear.svg?react"

interface Props {
  selectedFont: FontType
  selectFont: (font: FontType) => void
  fonts: FontType[]
}

const TextSettings = ({ selectedFont, selectFont, fonts }: Props) => {
  const settingsRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpenSettings = () => {
    setIsOpen(true)
  }

  const handleCloseSettings = () => {
    setIsOpen(false)
  }

  const renderSettingsMenu = () => {
    return (
      <>
        <div className="settings"></div>
        <div
          ref={settingsRef}
          className="settings-window"
        >
          <p>Select a font:</p>
          <div className="font-options">
            {fonts.map((font) => (
              <label key={font}>
                <input
                  type="radio"
                  value={font}
                  checked={selectedFont === font}
                  onChange={() => selectFont(font)}
                />
                {font}
              </label>
            ))}
          </div>
        </div>
      </>
    )
  }

  useOnClickOutside(settingsRef, handleCloseSettings)

  return (
    <>
      <button onClick={handleOpenSettings}>
        <SettingsIcon
          fill="white"
          width={18}
          height={18}
        />
      </button>
      {isOpen ? renderSettingsMenu() : ""}
    </>
  )
}
export default TextSettings
