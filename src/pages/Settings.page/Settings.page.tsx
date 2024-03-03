import { useState } from "react"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import { useAppSettingsStore } from "../../store/context/appSettingsContext"

import "./styles.scss"

import SettingsSection from "./SettingsSection"
import ConfirmModal from "../../components/Modal/ConfirmModal"
import Button from "../../components/Form/Button"
import TypingSettingsTextExample from "./TypingSettingsTextExample"

const SettingsPage = () => {
  const [isConfirmResetModalOpen, setIsConfirmResetModalOpen] = useState<boolean>(false)

  const {
    // all available values for each setting (they will be options in select)
    fontOptions,
    fontSizeOptions,
    // function to set each setting
    setFont,
    setFontSize,
    // value of each setting
    font,
    fontSize,
    // function to reset setting (set them back to default)
    resetTypingSettings,
  } = useTypingSettingsStore()

  const {
    themeOptions,
    languageOptions,
    setTheme,
    setLanguage,
    theme,
    language,
    resetAppSettings,
  } = useAppSettingsStore()

  const handleOpenConfirmResetModal = () => {
    setIsConfirmResetModalOpen(true)
  }

  const handleCloseConfirmResetModal = () => {
    setIsConfirmResetModalOpen(false)
  }

  // application settings
  const appSettings = [
    {
      name: "theme",
      selectedValue: theme,
      valueOptions: themeOptions,
      selectValue: setTheme,
    },
    {
      name: "language",
      selectedValue: language,
      valueOptions: languageOptions,
      selectValue: setLanguage,
    },
  ]

  // typing settings
  const typingSettings = [
    {
      name: "font",
      selectedValue: font,
      valueOptions: fontOptions,
      selectValue: setFont,
    },
    {
      name: "font size",
      selectedValue: fontSize,
      valueOptions: fontSizeOptions,
      selectValue: setFontSize,
    },
  ]

  // renders modal that asks user to confirm that they want to reset all settings
  const renderConfirmSettingsResetModal = () => {
    const appElement = document.querySelector(".App")

    if (!appElement) return

    return (
      <ConfirmModal
        closeModal={handleCloseConfirmResetModal}
        isVisible={isConfirmResetModalOpen}
        text="are you sure you want to reset all settings?"
        buttons={
          <>
            <Button
              className="positive"
              onClick={handleCloseConfirmResetModal}
            >
              dismiss
            </Button>
            <Button
              onClick={() => {
                resetTypingSettings()
                resetAppSettings()
                handleCloseConfirmResetModal()
              }}
              className="negative"
            >
              reset
            </Button>
          </>
        }
      />
    )
  }

  return (
    <div className="page settings-page">
      <SettingsSection
        sectionTitle="App Settings"
        settingsList={appSettings}
      />
      <SettingsSection
        sectionTitle="Typing Settings"
        settingsList={typingSettings}
      >
        <TypingSettingsTextExample />
      </SettingsSection>
      <div className="settings-button-list">
        <Button
          className="reset-settings-button"
          onClick={handleOpenConfirmResetModal}
        >
          reset settings
        </Button>
      </div>

      {renderConfirmSettingsResetModal()}
    </div>
  )
}
export default SettingsPage
