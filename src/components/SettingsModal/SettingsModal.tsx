import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import { useAppSettingsStore } from "../../store/context/appSettingsContext"

import "./styles.scss"

import Modal from "../Modal/Modal"
import SettingsSection from "./SettingsSection"
import ConfirmModal from "../Modal/ConfirmModal"
import Button from "../Form/Button"
import TypingSettingsTextExample from "./TypingSettingsTextExample"
import KeyboardTypeSelector from "./KeyboardTypeSelector"
import CustomKeyboardSelector from "./CustomKeyboardSelector"

interface Props {
  isVisible: boolean
  closeModal: () => void
}

const SettingsModal = ({ isVisible, closeModal }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "settings page" })

  const [isConfirmResetModalOpen, setIsConfirmResetModalOpen] = useState<boolean>(false)

  const {
    // all available values for each setting (they will be options in select)
    keyboardLanguageOptions,
    keyboardTypeOptions,
    fontOptions,
    fontSizeOptions,
    // function to set each setting
    setKeyboardLanguage,
    setKeyboardType,
    setFont,
    setFontSize,
    // value of each setting
    keyboardLanguage,
    keyboardLayout,
    keyboardType,
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
      name: t("theme"),
      selectedValue: t(theme),
      valueOptions: themeOptions,
      valueToShow: themeOptions.map((option) => t(option)),
      selectValue: setTheme,
    },
    {
      name: t("app language"),
      selectedValue: t(language),
      valueOptions: languageOptions,
      valueToShow: languageOptions.map((option) => t(option)),
      selectValue: setLanguage,
    },
  ]

  // keyboard settings
  const keyboardSettings = [
    {
      name: "keyboard language",
      selectedValue: keyboardLanguage,
      valueOptions: keyboardLanguageOptions,
      valueToShow: keyboardLanguageOptions,
      selectValue: setKeyboardLanguage,
    },
    {
      name: t("keyboard type"),
      selectedValue: t(keyboardType),
      valueOptions: keyboardTypeOptions,
      valueToShow: keyboardTypeOptions.map((option) => t(option)),
      selectValue: setKeyboardType,
    },
  ]

  // typing settings
  const typingSettings = [
    {
      name: t("font"),
      selectedValue: font,
      valueOptions: fontOptions,
      valueToShow: fontOptions,
      selectValue: setFont,
    },
    {
      name: t("font size"),
      selectedValue: t(fontSize),
      valueOptions: fontSizeOptions,
      valueToShow: fontSizeOptions.map((option) => t(option)),
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
    <Modal
      modalTitle={t("settings")}
      showCloseButton={true}
      isVisible={isVisible}
      closeModal={closeModal}
      className="settings-modal"
    >
      <SettingsSection
        sectionTitle={t("app settings")}
        settingsList={appSettings}
      />
      <SettingsSection
        sectionTitle={t("keyboard settings")}
        settingsList={keyboardSettings}
      >
        currently selected keyboard layout:
        <Link
          to="../keyboardlayout"
          className="select-keyboard-layout-link button"
        >
          Select Keyboard Layout
        </Link>
        {/* <KeyboardTypeSelector /> */}
      </SettingsSection>
      <SettingsSection
        sectionTitle={t("typing settings")}
        settingsList={typingSettings}
      >
        <TypingSettingsTextExample />
      </SettingsSection>
      <div className="settings-button-list">
        <Button
          className="reset-settings-button"
          onClick={handleOpenConfirmResetModal}
        >
          {t("reset settings")}
        </Button>
      </div>
      {renderConfirmSettingsResetModal()}
    </Modal>
  )
}
export default SettingsModal
