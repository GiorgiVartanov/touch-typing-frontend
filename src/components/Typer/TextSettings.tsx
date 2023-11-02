import { useState, useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { TypingSettingItemInterface } from "../../types/typingSettings.types"
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
    lineHeight,
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

  const settings: TypingSettingItemInterface[] = [
    {
      message: "font",
      field: "selectedFont",
      values: typingSettingsOptions.fontOptions,
      selectedValue: selectedFont,
      changeSetting: changeSetting,
    },
    {
      message: "lines",
      field: "amountOfShownLines",
      values: typingSettingsOptions.amountOfShownLinesOptions,
      selectedValue: amountOfShownLines,
      changeSetting: changeSetting,
    },
    {
      message: "align text",
      field: "alignText",
      values: typingSettingsOptions.alignTextOptions,
      selectedValue: alignText,
      changeSetting: changeSetting,
    },
    {
      message: "font size",
      field: "fontSize",
      values: typingSettingsOptions.fontSizeOptions,
      selectedValue: fontSize,
      changeSetting: changeSetting,
    },
    {
      message: "line height",
      field: "lineHeight",
      values: typingSettingsOptions.lineHeightOptions,
      selectedValue: lineHeight,
      changeSetting: changeSetting,
    },
    {
      message: "letter spacing",
      field: "letterSpacing",
      values: typingSettingsOptions.letterSpacingOptions,
      selectedValue: letterSpacing,
      changeSetting: changeSetting,
    },
  ]

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
              aria-label="close settings"
            >
              <div>+</div> {/* change to some svg latter */}
            </button>
          </div>
          {settings.map((setting) => (
            <TextSettingItemSelect
              message={setting.message}
              field={setting.field}
              values={setting.values}
              selectedValue={setting.selectedValue}
              changeSetting={setting.changeSetting}
              key={setting.field}
            />
          ))}
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
        aria-label="open settings"
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
