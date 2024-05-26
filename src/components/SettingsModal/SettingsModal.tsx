import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { createPortal } from "react-dom"

import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import { useAppSettingsStore } from "../../store/context/appSettingsContext"

import "./styles.scss"

import Modal from "../Modal/Modal"
import SettingsSection from "./SettingsSection"
import ConfirmModal from "../Modal/ConfirmModal"
import Button from "../Form/Button"
import TypingSettingsTextExample from "./TypingSettingsTextExample"

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
    keyboardSizeOptions,
    // function to set each setting
    setKeyboardLanguage,
    setKeyboardType,
    setFont,
    setFontSize,
    setKeyboardSize,
    setShowColoredKeys,
    setShowKeyboardWhileTyping,
    // value of each setting
    keyboardLanguage,
    keyboardLayout,
    keyboardType,
    font,
    fontSize,
    keyboardSize,
    showColoredKeys,
    showKeyboardWhileTyping,
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
      name: t("keyboard language"),
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
    {
      name: t("keyboard size"),
      selectedValue: t(keyboardSize),
      valueOptions: keyboardSizeOptions,
      valueToShow: keyboardSizeOptions.map((option) => t(option)),
      selectValue: setKeyboardSize,
    },
    {
      name: t("show colored keys"),
      selectedValue: showColoredKeys ? t("show") : t("hide"),
      valueOptions: [true, false],
      valueToShow: [t("show"), t("hide")],
      selectValue: setShowColoredKeys,
    },
    {
      name: t("show keyboard while typing"),
      selectedValue: showKeyboardWhileTyping ? t("show") : t("hide"),
      valueOptions: [true, false],
      valueToShow: [t("show"), t("hide")],
      selectValue: setShowKeyboardWhileTyping,
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

    return createPortal(
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
      />,
      appElement
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
        <div className="selected-keyboard">
          <p className="selected-keyboard-text">
            {t("selected layout")}:{" "}
            <Link
              to={`/layout/${keyboardLayout[keyboardLanguage]._id}`}
              className="selected-keyboard-title"
            >
              {keyboardLayout[keyboardLanguage].title}
            </Link>
          </p>
          <Link
            to="../layout"
            className="select-keyboard-layout-link button"
          >
            {t("select another")}
          </Link>
        </div>
      </SettingsSection>
      <SettingsSection
        sectionTitle={t("typing settings")}
        settingsList={typingSettings}
      >
        <TypingSettingsTextExample language={keyboardLanguage} />
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
