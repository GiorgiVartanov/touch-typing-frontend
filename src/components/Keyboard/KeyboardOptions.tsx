import { useTypingSettingsStore } from "../../store/context/typingSettingsContext"
import {
  KeyboardLanguageType,
  KeyboardTypeType,
  savedKeyboardLayoutInterface,
} from "../../types/typer.types/typingSettings.types"
import { KeyInterface, KeyboardLayoutInterface } from "../../types/keyboard.types"
import { toast } from "react-toastify"

import PenIcon from "../../assets/icons/pen.svg?react"
import EmptyCircleCheck from "../../assets/icons/circle-check-empty.svg?react"
import FilledCircleCheck from "../../assets/icons/circle-check-full.svg?react"

import Select from "../Form/Select"
import Button from "../Form/Button"
import Tooltip from "../Tooltip/Tooltip"

interface Props {
  className?: string
  showLanguageSelector?: boolean
  forcedLanguage?: "En" | "Geo" | null
  showSelectButton?: boolean
  showEditButton?: boolean
  newKeyboardLayout?: KeyboardLayoutInterface
  handleEditing?: () => void
}

const KeyboardOptions = ({
  className = "",
  showLanguageSelector = true,
  forcedLanguage,
  showSelectButton = true,
  showEditButton = false,
  newKeyboardLayout,
  handleEditing,
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
  } = useTypingSettingsStore()

  // console.log(forcedLanguage)

  const currentLanguage = forcedLanguage || keyboardLanguage

  const isAlreadySelected =
    newKeyboardLayout?._id ===
      keyboardLayout[(newKeyboardLayout?.language as "En" | "Geo") || "En"]._id || false

  const selectKeyboardLayout = () => {
    if (!newKeyboardLayout) return

    toast.success("successfully selected new layout")

    setKeyboardLayout({ ...keyboardLayout, [newKeyboardLayout.language]: newKeyboardLayout })
  }

  return (
    <div className={`keyboard-options ${className}`}>
      {showLanguageSelector ? (
        <div className="keyboard-option-item">
          <Select
            name="language"
            value={currentLanguage}
            options={keyboardLanguageOptions}
            onChange={(value: string) => {
              setKeyboardLanguage(value as KeyboardLanguageType)
            }}
            disabled={forcedLanguage ? true : false}
          />
        </div>
      ) : null}
      <div className="keyboard-option-item">
        <Select
          name="type"
          value={keyboardType}
          options={keyboardTypeOptions}
          onChange={(value: string) => {
            setKeyboardType(value as KeyboardTypeType)
          }}
        />
      </div>
      <div className="keyboard-options-right-side-buttons">
        {showEditButton ? (
          <Tooltip
            tooltipContent="edit"
            tooltipPosition="top"
          >
            <Button
              onClick={handleEditing}
              className="keyboard-options-button"
            >
              <PenIcon className="icon" />
            </Button>
          </Tooltip>
        ) : null}
        {showSelectButton ? (
          <Tooltip
            tooltipContent="select"
            tooltipPosition="top"
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
