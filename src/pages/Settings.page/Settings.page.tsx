import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import { useAppSettingsStore } from "../../store/context/appSettingsContext"

import "./styles.scss"

import SettingsSection from "./SettingsSection"

const SettingsPage = () => {
  const { theme, language, setTheme, setLanguage, themeOptions, languageOptions } =
    useAppSettingsStore()

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

  const appSettings = [
    {
      name: "theme",
      selectedValue: theme,
      valueOptions: themeOptions,
      selectValue: setTheme,
      settingType: "radio",
    },
    // {
    //   name: "language",
    //   selectedValue: language,
    //   valueOptions: languageOptions,
    //   selectValue: setLanguage,
    //   settingType: "radio",
    // },
  ]

  const typingSettings = [
    {
      name: "font",
      selectedValue: font,
      valueOptions: fontOptions,
      selectValue: setFont,
      settingType: "select",
    },
    {
      name: "lines",
      selectedValue: amountOfShownLines,
      valueOptions: amountOfShownLinesOptions,
      selectValue: setAmountOfShownLines,
      settingType: "select",
    },
    {
      name: "align text",
      selectedValue: alignText,
      valueOptions: alignTextOptions,
      selectValue: setAlignText,
      settingType: "select",
    },
    {
      name: "font size",
      selectedValue: fontSize,
      valueOptions: fontSizeOptions,
      selectValue: setFontSize,
      settingType: "select",
    },
    {
      name: "line height",
      selectedValue: lineHeight,
      valueOptions: lineHeightOptions,
      selectValue: setLineHeight,
      settingType: "select",
    },
    {
      name: "letter spacing",
      selectedValue: letterSpacing,
      valueOptions: letterSpacingOptions,
      selectValue: setLetterSpacing,
      settingType: "select",
    },
  ]

  return (
    <div className="page settings-page">
      <SettingsSection
        sectionTitle="App Settings"
        settingsList={appSettings}
      />
      <SettingsSection
        sectionTitle="Typing Settings"
        settingsList={typingSettings}
      />
    </div>
  )
}
export default SettingsPage
