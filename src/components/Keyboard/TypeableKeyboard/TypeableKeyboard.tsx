import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import "./styles.scss"
import { KeyInterface } from "../../../types/keyboard.types"
import { KeyboardLayoutInterface } from "../../../types/keyboard.types"
import { KeyboardLanguageType } from "../../../types/typer.types/typingSettings.types"
import { useTypingSettingsStore } from "../../../store/context/typingSettingsContext"
import { useOnClickOutside } from "../../../hooks/useOnClickOutside"

import WrenchIcon from "../../../assets/icons/wrench.svg?react"
import ExportIcon from "../../../assets/icons/export.svg?react"
import QuestionIcon from "../../../assets/icons/question.svg?react"

import Key from "./Key"
import KeyboardOptions from "../KeyboardOptions"
import Button from "../../Form/Button"
import Tooltip from "../../Tooltip/Tooltip"

interface Props {
  forcedKeyboardLayout?: KeyboardLayoutInterface
  forcedLanguage?: KeyboardLanguageType
  forceVisible?: boolean
  handleEditing: () => void
  inactiveKeys?: string[]
  showSelectButton?: boolean
  showEditButton: boolean
  showKeyboardTypeSelector: boolean
  showHideKeyboardButton: boolean
  showLanguageSelector: boolean
  showUtilityButtons: boolean
  keySize?: number
}

const TypeableKeyboard = ({
  forcedKeyboardLayout,
  forcedLanguage,
  forceVisible = false,
  handleEditing,
  showSelectButton = true,
  showEditButton = false,
  showKeyboardTypeSelector,
  showHideKeyboardButton,
  inactiveKeys = ["Tab", "AltRight", "AltLeft", "MetaRight", "MetaLeft", "ContextMenu", ""],
  showLanguageSelector,
  showUtilityButtons = true,
  keySize = 3.25,
}: Props) => {
  const {
    keyboardType,
    keyboardLanguage,
    showColoredKeys,
    showKeyboardWhileTyping,
    setShowKeyboardWhileTyping,
    keyboardLayout: currentKeyboardLayout,
  } = useTypingSettingsStore()

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const ref = useRef<HTMLInputElement>(null)

  const keyboardLayout =
    forcedKeyboardLayout || currentKeyboardLayout[forcedLanguage || keyboardLanguage]
  const keyboard = keyboardLayout.keyboard

  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [areRightSideButtonsOpen, setAreRightSideButtonsOpen] = useState<boolean>(false)
  const [userOS, setUserOS] = useState<string | null>(null)

  const handleButtonClick = () => {
    setAreRightSideButtonsOpen((prevState) => !prevState)
  }

  const handleClose = () => {
    setAreRightSideButtonsOpen(false)
  }

  const renderKeyboard = () => {
    const backslashKeyIndex = 27
    const secondBackslashIndex = 43
    const enterKeyIndex = 40

    const phantomKey: KeyInterface = {
      code: "Phantom",
      value: [""],
      type: "Letter",
    }

    const secondBackslash: KeyInterface = {
      ...keyboard[backslashKeyIndex],
      code: "Backslash-2",
    }

    const tempKeyboard = [...keyboard]

    switch (keyboardType) {
      case "ANSI":
        return tempKeyboard.map((key) => renderKey(key))
      case "ISO":
        tempKeyboard[enterKeyIndex] = keyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = keyboard[enterKeyIndex]

        tempKeyboard.splice(secondBackslashIndex - 2, 0, phantomKey)
        tempKeyboard.splice(secondBackslashIndex, 0, secondBackslash)

        return tempKeyboard.map((key) => renderKey(key))
      case "ANSI-ISO":
        tempKeyboard[enterKeyIndex] = keyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = keyboard[enterKeyIndex]

        return tempKeyboard.map((key) => renderKey(key))
      default:
        return tempKeyboard.map((key) => renderKey(key))
    }
  }

  const renderKey = (key: KeyInterface) => {
    return (
      <Key
        value={key.value}
        key={key.code}
        isPressed={pressedKeys.includes(key.code)}
        isActive={!inactiveKeys.includes(key.code)}
        inUppercase={
          (pressedKeys.includes("ShiftLeft") ||
            pressedKeys.includes("ShiftRight") ||
            (pressedKeys.includes("CapsLock") &&
              key.type === "Letter" &&
              key.value[0]?.toLocaleLowerCase() === key.value[1]?.toLowerCase())) &&
          !(
            (pressedKeys.includes("ShiftLeft") && pressedKeys.includes("CapsLock")) ||
            (pressedKeys.includes("ShiftRight") && pressedKeys.includes("CapsLock"))
          )
        }
        className={`${key.type}-key ${key.code}-key`}
      />
    )
  }

  // renders buttons that are in a bottom right corner
  const renderRightSideKeyboardButtons = () => {
    return (
      <div className="keyboard-right-side-buttons">
        <Button
          onClick={handleButtonClick}
          className={`show-more-keyboard-action-buttons-button ${areRightSideButtonsOpen ? "active" : ""}`}
        >
          <Tooltip
            tooltipContent={t("expand")}
            tooltipPosition="bottom-left"
          >
            <WrenchIcon className="icon" />
          </Tooltip>
        </Button>

        {areRightSideButtonsOpen ? (
          <div className="keyboard-button-list">
            <Tooltip
              tooltipContent={t("how to install")}
              tooltipPosition="bottom-center"
            >
              <Link
                className="button how-to-install-link"
                style={{ animationDelay: "100ms" }}
                to={`../guides/how_to_install_layout_on_${userOS}`}
              >
                <QuestionIcon className="icon" />
              </Link>
            </Tooltip>
            <Tooltip
              tooltipContent={t("Export")}
              tooltipPosition="bottom-left"
            >
              <Button
                onClick={() => {}}
                style={{ animationDelay: "0ms" }}
              >
                <ExportIcon className="icon" />
              </Button>
            </Tooltip>
          </div>
        ) : null}
      </div>
    )
  }

  const renderKeyboardButtons = () => {
    return <div className="editable-keyboard-buttons">{renderRightSideKeyboardButtons()}</div>
  }

  useOnClickOutside(ref, () => {
    handleClose()
  })

  useEffect(() => {
    const detectOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      if (userAgent.includes("windows")) {
        setUserOS("windows")
      } else if (userAgent.includes("mac")) {
        setUserOS("mac")
      } else if (userAgent.includes("linux")) {
        setUserOS("linux")
      } else {
        setUserOS("unknown")
      }
    }

    detectOS()
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      if (
        pressedKey === "Alt" ||
        pressedKey === "Space" ||
        pressedKey === "Quote" ||
        pressedKey === "Slash"
      )
        event.preventDefault()

      if (pressedKey === "CapsLock") {
        setPressedKeys((prevState) => {
          if (prevState.includes("capslock")) {
            return prevState.filter((key) => key !== "CapsLock")
          } else {
            return [...prevState, pressedKey]
          }
        })
      } else {
        setPressedKeys((prevState) => {
          if (prevState.includes(pressedKey)) return prevState
          return [...prevState, pressedKey]
        })
      }

      if (event.getModifierState("CapsLock")) {
        setPressedKeys((prevState) => [...prevState, pressedKey])
      } else {
        setPressedKeys((prevState) => prevState.filter((key) => key !== "CapsLock"))
      }
    }

    const handleKeyUnPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      if (
        pressedKey === "Alt" ||
        pressedKey === "Space" ||
        pressedKey === "Quote" ||
        pressedKey === "Slash"
      )
        event.preventDefault()

      if (pressedKey === "CapsLock") return

      setPressedKeys((prevState) => prevState.filter((key) => key !== pressedKey))
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyUnPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyUnPress)
    }
  }, [])

  console.log(showKeyboardWhileTyping, forceVisible)

  return (
    <div
      ref={ref}
      className="editable-keyboard-holder"
    >
      <div className="editable-keyboard-content">
        <KeyboardOptions
          forcedLanguage={forcedKeyboardLayout?.language || forcedLanguage}
          forceVisible={forceVisible}
          showSelectButton={showSelectButton}
          showEditButton={showEditButton}
          showKeyboardTypeSelector={showKeyboardTypeSelector}
          showLanguageSelector={showLanguageSelector}
          showHideKeyboardButton={showHideKeyboardButton}
          newKeyboardLayout={keyboardLayout}
          handleEditing={handleEditing}
          changeVisibility={() => {
            setShowKeyboardWhileTyping(!showKeyboardWhileTyping)
          }}
        />
        <div
          style={{ "--key-size": `${keySize}rem` } as React.CSSProperties}
          className={`keyboard keyboard-${keyboardType} ${showColoredKeys ? "" : "same-color-keys"} ${showKeyboardWhileTyping || forceVisible ? "" : "keyboard-hidden"}`}
        >
          {renderKeyboard()}
        </div>
        {showUtilityButtons ? renderKeyboardButtons() : null}
      </div>
    </div>
  )
}
export default TypeableKeyboard
