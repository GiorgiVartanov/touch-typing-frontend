import { useState, useRef } from "react"

import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { TypingSettingItemInterface } from "../../types/typingSettings.types"
import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
// import { FontType } from "../../types/typingSettings.types"

import SettingsIcon from "../../assets/icons/gear.svg?react"
import TextSettingItemSelect from "./TextSettingItemSelect"

// renders setting button, clicking on this button will open text settings
// in setting menu user can change settings
// if user is logged in, settings will be changed for their account
// if user is not logged in, settings will get changed locally (for now they will get changed back to default if page is refreshed, but it will stay letter)
const TextSettings = () => {
  const {
    // all available values for each setting (they will be options in select)
    fontOptions,
    amountOfShownLinesOptions,
    alignTextOptions,
    fontSizeOptions,
    lineHeightOptions,
    letterSpacingOptions,
    // function to set each setting
    setFont,
    setAmountOfShownLines,
    setAlignText,
    setFontSize,
    setLineHeight,
    setLetterSpacing,
    // value of each setting
    font,
    amountOfShownLines,
    alignText,
    fontSize,
    lineHeight,
    letterSpacing,
    // function to reset setting (set them back to default)
    resetTypingSettings,
  } = useTypingSettingsStore()

  const settingsRef = useRef<HTMLDivElement>(null)

  // if true settings are open, if false they are closed
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
      values: fontOptions,
      selectedValue: font,
      changeSetting: setFont,
    },
    {
      message: "lines",
      values: amountOfShownLinesOptions,
      selectedValue: amountOfShownLines,
      changeSetting: setAmountOfShownLines,
    },
    {
      message: "align text",
      values: alignTextOptions,
      selectedValue: alignText,
      changeSetting: setAlignText,
    },
    {
      message: "font size",
      values: fontSizeOptions,
      selectedValue: fontSize,
      changeSetting: setFontSize,
    },
    {
      message: "line height",
      values: lineHeightOptions,
      selectedValue: lineHeight,
      changeSetting: setLineHeight,
    },
    {
      message: "letter spacing",
      values: letterSpacingOptions,
      selectedValue: letterSpacing,
      changeSetting: setLetterSpacing,
    },
  ]

  // renders setting menu
  const renderSettingsMenu = () => {
    return (
      <>
        <div className="settings-background"></div>
        <div
          ref={settingsRef}
          className="settings-window"
        >
          {settings.map((setting) => (
            <TextSettingItemSelect
              message={setting.message}
              changeSetting={setting.changeSetting}
              values={setting.values}
              selectedValue={setting.selectedValue}
              key={setting.message}
            />
          ))}
          <button
            className="reset-settings-button"
            onClick={resetTypingSettings}
          >
            reset settings
          </button>
          <p
            className="close-message"
            onClick={handleCloseSettings}
          >
            click anywhere on a screen to close
          </p>
        </div>
      </>
    )
  }

  // runs handleCloseSettings function when user clicks outside of component with settingsRef (settings menu)
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
