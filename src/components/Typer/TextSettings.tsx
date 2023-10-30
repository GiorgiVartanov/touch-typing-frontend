import { useState, useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
// import { FontType } from "../../types/typingSettings.types"

import SettingsIcon from "../../assets/icons/gear.svg?react"
import TextSettingItemSelect from "./TextSettingItemSelect"

const TextSettings = () => {
  const {
    typingSettingsOptions,
    selectedFont,
    amountOfShownLines,
    alignText,
    fontSize,
    lineSpacing,
    letterSpacing,
    changeSetting,
  } = useTypingSettingsStore()

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
        <div className="settings-background"></div>
        <div
          ref={settingsRef}
          className="settings-window"
        >
          <div className="typing-settings-bar">
            <div>typing settings</div>
            <button
              onClick={handleCloseSettings}
              className="close-settings"
            >
              <div>+</div>
            </button>
          </div>

          <TextSettingItemSelect
            message={"font"}
            field="selectedFont"
            values={typingSettingsOptions.fontOptions}
            selectedValue={selectedFont}
            changeSetting={changeSetting}
          />
          <TextSettingItemSelect
            message={"lines"}
            field="amountOfShownLines"
            values={typingSettingsOptions.amountOfShownLinesOptions}
            selectedValue={amountOfShownLines}
            changeSetting={changeSetting}
          />
          <TextSettingItemSelect
            message={"align text"}
            field="alignText"
            values={typingSettingsOptions.alignTextOptions}
            selectedValue={alignText}
            changeSetting={changeSetting}
          />
          <TextSettingItemSelect
            message={"font size"}
            field="fontSize"
            values={typingSettingsOptions.fontSizeOptions}
            selectedValue={fontSize}
            changeSetting={changeSetting}
          />
          <TextSettingItemSelect
            message={"line spacing"}
            field="lineSpacing"
            values={typingSettingsOptions.lineSpacingOptions}
            selectedValue={lineSpacing}
            changeSetting={changeSetting}
          />
          <TextSettingItemSelect
            message={"letter spacing"}
            field="letterSpacing"
            values={typingSettingsOptions.letterSpacingOptions}
            selectedValue={letterSpacing}
            changeSetting={changeSetting}
          />
        </div>
      </>
    )
  }

  useOnClickOutside(settingsRef, handleCloseSettings)

  return (
    <>
      <button
        onClick={handleOpenSettings}
        className="settings-button"
      >
        <SettingsIcon
          fill="gray"
          width={24}
          height={24}
        />
      </button>
      {isOpen ? renderSettingsMenu() : ""}
    </>
  )
}
export default TextSettings
