import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import {
  KeyboardLanguageType,
  KeyboardTypeType,
} from "../../types/typer.types/typingSettings.types"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

import EmptyCircleCheck from "../../assets/icons/circle-check-empty.svg?react"
import FilledCircleCheck from "../../assets/icons/circle-check-full.svg?react"
import EyeIcon from "../../assets/icons/eye.svg?react"
import EyeSlashIcon from "../../assets/icons/eye-slash.svg?react"

import Select from "../Form/Select"
import Button from "../Form/Button"
import Tooltip from "../Tooltip/Tooltip"

interface Props {
  forceVisible: boolean
  showLanguageSelector: boolean
  showSelectButton: boolean
  showEditButton: boolean
  showKeyboardTypeSelector: boolean
  showHideKeyboardButton: boolean
  newKeyboardLayout?: KeyboardLayoutInterface
  forcedLanguage?: KeyboardLanguageType
  className?: string
  handleEditing?: () => void
  changeVisibility?: () => void
}

const KeyboardOptions = ({
  forceVisible,
  showLanguageSelector,
  showSelectButton,
  showHideKeyboardButton,
  showKeyboardTypeSelector,
  forcedLanguage,
  newKeyboardLayout,
  className = "",
  changeVisibility,
}: Props) => {
  const {
    keyboardLanguageOptions,
    keyboardTypeOptions,
    keyboardLayout,

    setKeyboardLanguage,
    setKeyboardType,
    setKeyboardLayout,

    keyboardLanguage,
    keyboardType,
    showKeyboardWhileTyping,
  } = useTypingSettingsStore()

  const currentLanguage = forcedLanguage || keyboardLanguage

  const isAlreadySelected =
    newKeyboardLayout?._id ===
      keyboardLayout[(newKeyboardLayout?.language as KeyboardLanguageType) || "Eng"]._id || false

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const selectKeyboardLayout = () => {
    if (!newKeyboardLayout) return

    toast.success(t("successfully selected new layout"))

    setKeyboardLayout({ ...keyboardLayout, [newKeyboardLayout.language]: newKeyboardLayout })
  }

  return (
    <div className={`keyboard-options ${className}`}>
      {(showLanguageSelector && (!showHideKeyboardButton || showKeyboardWhileTyping)) ||
      (showLanguageSelector && forceVisible) ? (
        <div className="keyboard-option-item">
          <Select
            name={t("language")}
            value={t(currentLanguage)}
            options={keyboardLanguageOptions}
            optionsToShow={keyboardLanguageOptions.map((keyboardLanguage) => t(keyboardLanguage))}
            onChange={(value: string) => {
              setKeyboardLanguage(value as KeyboardLanguageType)
            }}
            disabled={forcedLanguage ? true : false}
            className="keyboard-language-selector"
          />
        </div>
      ) : null}
      {(showKeyboardTypeSelector && (!showHideKeyboardButton || showKeyboardWhileTyping)) ||
      (showLanguageSelector && forceVisible) ? (
        <div className="keyboard-option-item">
          <Select
            name={t("type")}
            value={t(keyboardType)}
            options={keyboardTypeOptions}
            optionsToShow={keyboardTypeOptions.map((keyboardTypeOption) => t(keyboardTypeOption))}
            onChange={(value: string) => {
              setKeyboardType(value as KeyboardTypeType)
            }}
            className="keyboard-type-selector"
          />
        </div>
      ) : null}
      <div className="keyboard-options-right-side-buttons">
        {showHideKeyboardButton ? (
          <>
            {showKeyboardWhileTyping ? (
              <Tooltip
                tooltipContent={t("hide")}
                tooltipPosition="top-left"
              >
                <Button
                  onClick={changeVisibility}
                  className="keyboard-options-button"
                >
                  <EyeSlashIcon className="icon" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip
                tooltipContent={t("show")}
                tooltipPosition="top-left"
              >
                <Button
                  onClick={changeVisibility}
                  className="keyboard-options-button"
                >
                  <EyeIcon className="icon" />
                </Button>
              </Tooltip>
            )}
          </>
        ) : null}
        {(showSelectButton && (!showHideKeyboardButton || showKeyboardWhileTyping)) ||
        (showLanguageSelector && forceVisible) ? (
          <Tooltip
            tooltipContent={isAlreadySelected ? t("selected") : t("select")}
            tooltipPosition="top-left"
          >
            {isAlreadySelected ? (
              <Button
                // onClick={selectKeyboardLayout}
                className="keyboard-options-button"
              >
                <FilledCircleCheck className="icon" />
              </Button>
            ) : (
              <Button
                onClick={selectKeyboardLayout}
                className="keyboard-options-button"
              >
                <EmptyCircleCheck className="icon" />
              </Button>
            )}
          </Tooltip>
        ) : null}
      </div>
    </div>
  )
}

export default KeyboardOptions
