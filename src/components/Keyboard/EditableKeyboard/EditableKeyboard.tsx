import { useEffect, useState, useRef, useContext } from "react"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import "./styles.scss"
import { KeyInterface } from "../../../types/keyboard.types"
import { useTypingSettingsStore } from "../../../store/context/typingSettingsContext"
import { useOnClickOutside } from "../../../hooks/useOnClickOutside"
import { useAuthStore } from "../../../store/context/authContext"

import georgianLetters from "../../../letters/georgian.json"
import englishLetters from "../../../letters/english.json"
import symbols from "../../../letters/symbols.json"

import WrenchIcon from "../../../assets/icons/wrench.svg?react"
import AnalyzeIcon from "../../../assets/icons/analyze.svg?react"
import ExportIcon from "../../../assets/icons/export.svg?react"
import FloppyDiskIcon from "../../../assets/icons/floppy-disk.svg?react"
import ImportIcon from "../../../assets/icons/import.svg?react"
import RobotIcon from "../../../assets/icons/robot.svg?react"
import EraserIcon from "../../../assets/icons/eraser.svg?react"
import ResetIcon from "../../../assets/icons/arrow-rotate-left.svg?react"
import QuestionIcon from "../../../assets/icons/question.svg?react"

import EditableKey from "./EditableKey"
import SelectedEditableKey from "./SelectedEditableKey"
import Button from "../../Form/Button"
import Tooltip from "../../Tooltip/Tooltip"
import SaveLayoutModal from "./SaveLayoutModal"
import KeyboardOptions from "../KeyboardOptions"

import { useOptimizationStore } from "../../../store/context/optimizationContext"

interface Props {
  startingKeyboard: KeyInterface[]
  handleEditing: () => void
  uneditableKeys?: string[]
  uneditableFirstValueKeys?: string[]
  uneditableSecondValueKeys?: string[]
  keySize?: number
}

// keyboard that can be edited
const EditableKeyboard = ({
  startingKeyboard,
  handleEditing,
  uneditableKeys = [
    "Tab",
    "AltRight",
    "AltLeft",
    "MetaRight",
    "MetaLeft",
    "ContextMenu",
    "Space",
    "ControlLeft",
    "ControlRight",
    "ShiftLeft",
    "ShiftRight",
    "CapsLock",
    "Enter",
    "Backspace",
    "Backquote",
    "Digit0",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Backslash",
    "Backslash-2", // backslash that is next to left shift on ISO layout
  ],
  uneditableFirstValueKeys = [], // keys that have their first (default, without shift/caps lock) value uneditable
  uneditableSecondValueKeys = [], // keys that have their second (one accessed with shift/caps lock) value uneditable
  keySize = 3.25, // size of one key in rem
}: Props) => {
  const {
    progress,
    startOptimization,
    optimizationStatus,
    optimizedEditingKeyboard,
    setOptimizedEditingKeyboard,
  } = useOptimizationStore()

  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  const ref = useRef<HTMLInputElement>(null)

  const { keyboardType, keyboardLanguage, showColoredKeys } = useTypingSettingsStore()
  const { isLoggedIn } = useAuthStore()

  const [pressedKeys, setPressedKeys] = useState<string[]>([])
  const [currentlyEditing, setCurrentlyEditing] = useState<string | null>(null)
  const [wasSelectedAtLeaseOnce, setWasSelectedAtLeaseOnce] = useState<boolean>(false)
  const [editingKeyboard, setEditingKeyboard] = useState<KeyInterface[]>(
    structuredClone(startingKeyboard) // deep copy
  ) // startingKeyboard prop is used as a default value here
  const [areRightSideButtonsOpen, setAreRightSideButtonsOpen] = useState<boolean>(false)
  const [userOS, setUserOS] = useState<string | null>(null)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)
  useEffect(() => {
    if (editingKeyboard === optimizedEditingKeyboard) setOptimizedEditingKeyboard(undefined)
  }, [editingKeyboard])

  if (optimizedEditingKeyboard) {
    if (editingKeyboard !== optimizedEditingKeyboard) setEditingKeyboard(optimizedEditingKeyboard)
  }

  const renderKeyboard = () => {
    // will change letter
    const backslashKeyIndex = 27
    const secondBackslashIndex = 43
    const enterKeyIndex = 40

    const phantomKey: KeyInterface = {
      code: "Phantom",
      value: [""],
      type: "Letter",
    }

    const secondBackslash: KeyInterface = {
      ...startingKeyboard[backslashKeyIndex],
      code: "Backslash-2",
    }

    const tempKeyboard = [...editingKeyboard]

    switch (keyboardType) {
      case "ANSI":
        return tempKeyboard.map((key) => renderKey(key))
      case "ISO":
        tempKeyboard[enterKeyIndex] = startingKeyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = startingKeyboard[enterKeyIndex]

        tempKeyboard.splice(secondBackslashIndex - 2, 0, phantomKey)
        tempKeyboard.splice(secondBackslashIndex, 0, secondBackslash)

        return tempKeyboard.map((key) => renderKey(key))
      case "ANSI-ISO":
        tempKeyboard[enterKeyIndex] = startingKeyboard[backslashKeyIndex]
        tempKeyboard[backslashKeyIndex] = startingKeyboard[enterKeyIndex]

        return tempKeyboard.map((key) => renderKey(key))
      default:
        return tempKeyboard.map((key) => renderKey(key))
    }
  }

  // selects passed keyCode as currently edited
  const selectAsEditable = (keyCode: string) => {
    setWasSelectedAtLeaseOnce(true)
    setCurrentlyEditing(keyCode)
  }

  // when user clicks outside this component
  const handleOnClickOutside = () => {
    setCurrentlyEditing(null)
  }

  // when user clicks on button to open/close buttons in a bottom right corner of a keyboard
  const handleRightSideButtons = () => {
    setAreRightSideButtonsOpen((prevState) => !prevState)
  }

  // closes buttons in a bottom right corner
  const handleCloseRightSideButtons = () => {
    setAreRightSideButtonsOpen(false)
  }

  // resets keyboard to default value (one that user has selected)
  const resetKeys = () => {
    setEditingKeyboard(startingKeyboard)
  }

  //
  const optimizeLayout = async () => {
    startOptimization()
  }

  // opens save layout modal
  const handleOpenSaveKeyboardModal = () => {
    if (isLoggedIn) {
      setIsSaveModalOpen(true)
    } else {
      toast.warning("log in to save your layout", { toastId: "log in to save your layout" })
    }
  }

  const handleNotImplemented = () => {
    toast.warning("This feature is not yet implemented")
  }

  // closes save layout modal
  const handleCloseSaveKeyboardModal = () => {
    setIsSaveModalOpen(false)
  }

  // renders modal where user can save current layout
  const renderSaveKeyboardLayoutModal = () => {
    if (!isSaveModalOpen) return null

    // default value
    const currentTitle = editingKeyboard
      .slice(15, 21)
      .reduce((accumulator, currentValue) => accumulator + currentValue?.value[0], "")

    console.log(startingKeyboard)

    return (
      <SaveLayoutModal
        modalTitle="save layout"
        isVisible={isSaveModalOpen}
        keyboard={editingKeyboard}
        currentLanguage={keyboardLanguage}
        currentTitle={currentTitle}
        closeModal={handleCloseSaveKeyboardModal}
      />
    )
  }

  // erases all editable keys (passed as a prop) from keyboard
  const emptyEditableKeys = () => {
    setEditingKeyboard((prevState) => {
      const currentKeyboard = structuredClone(prevState)
      const filteredKeyboard = currentKeyboard.map((key) => {
        if (uneditableKeys.includes(key.code)) return key
        else return { code: key.code, value: [""], type: key.type }
      })

      return filteredKeyboard
    })
  }

  // removes passed key from keyboard
  const removeKey = (keyCode: string) => {
    if (
      uneditableKeys.includes(keyCode) ||
      uneditableFirstValueKeys.includes(keyCode) ||
      uneditableSecondValueKeys.includes(keyCode)
    )
      return

    setEditingKeyboard((prevState) => {
      const editedKeyboard = structuredClone(prevState).map((key) => {
        if (key.code === keyCode) {
          return {
            code: key.code,
            // value: [enteredCharacter?.toLowerCase() || enteredCharacter?.toUpperCase()],
            value: [""],
            type: key.type,
          }
        } else {
          return key
        }
      })

      return editedKeyboard
    })
  }

  // renders single key
  const renderKey = (key: KeyInterface) => {
    // console.log(
    //   editingKeyboard[33].value[0],
    //   editingKeyboard[33].value[1],
    //   editingKeyboard[17].value[0],
    //   editingKeyboard[17].value[1]
    // )

    // is true if this value has copy somewhere on a keyboard
    const isFirstValueDuplicate = editingKeyboard.some(
      (keyboardKey) =>
        (keyboardKey.type === "Letter" || keyboardKey.type === "Symbol") &&
        keyboardKey !== key &&
        (key.value[0]?.toLowerCase() === keyboardKey.value[0]?.toLowerCase() ||
          key.value[0]?.toLowerCase() === keyboardKey.value[1]?.toLowerCase())
    )

    // is true if this value has copy somewhere on a keyboard
    const isSecondValueDuplicate = editingKeyboard.some(
      (keyboardKey) =>
        (keyboardKey.type === "Letter" || keyboardKey.type === "Symbol") &&
        keyboardKey !== key &&
        (key.value[1]?.toLowerCase() === keyboardKey.value[1]?.toLowerCase() ||
          key.value[1]?.toLowerCase() === keyboardKey.value[0]?.toLowerCase())
    )

    return (
      <EditableKey
        value={key.value}
        code={key.code}
        isEditing={key.code === currentlyEditing}
        onClick={() => {
          selectAsEditable(key.code)
        }}
        key={key.code}
        isPressed={pressedKeys.includes(key.code)}
        isEditable={!uneditableKeys.includes(key.code)}
        isEmpty={key.value[0] === ""}
        isFirstValueDuplicate={isFirstValueDuplicate}
        isSecondValueDuplicate={isSecondValueDuplicate}
        onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault()

          removeKey(key.code)
        }}
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
        canBeDuplicate={key.code === "Backslash" || key.code === "Backslash-2"}
        className={`${key.type}-key ${key.code}-key`}
      />
    )
  }

  // renders key where user can change first and second value of a key
  const renderSelectedKey = () => {
    const editingKey = editingKeyboard.find((key) => key.code === currentlyEditing)

    const keysThatWontShowWarning = [
      "Tab",
      "AltRight",
      "AltLeft",
      "MetaRight",
      "MetaLeft",
      "ContextMenu",
      "Space",
      "ControlLeft",
      "ControlRight",
      "ShiftLeft",
      "ShiftRight",
      "CapsLock",
      "Enter",
      "Backspace",
      "Backquote",
    ]

    const handleOnFirstValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const enteredCharacter = event.nativeEvent?.data // it works, but typescript shows error.

      if (
        keyboardLanguage === "Geo" &&
        ![...georgianLetters, ...symbols].includes(enteredCharacter) &&
        enteredCharacter !== null
      ) {
        toast.warning("sorry, this character can't be used")

        return
      }

      if (
        keyboardLanguage === "Eng" &&
        ![...englishLetters, ...symbols].includes(enteredCharacter) &&
        enteredCharacter !== null
      ) {
        toast.warning("sorry, this character can't be used")

        return
      }

      if (
        uneditableKeys.includes(enteredCharacter) &&
        !keysThatWontShowWarning.includes(enteredCharacter)
      ) {
        toast.warning("this key can't be used")

        return
      }

      let enteredCharacterType =
        editingKeyboard.find(
          (key) => key.value[0] === enteredCharacter || key.value[1] === enteredCharacter
        )?.type || "Letter"

      if (!["Letter", "Digit", "Symbol"].includes(enteredCharacterType))
        enteredCharacterType = "Letter"

      // if (!enteredCharacter) return

      setEditingKeyboard((prevState) => {
        const editedKeyboard = structuredClone(prevState).map((key) => {
          if (key.code === currentlyEditing) {
            return {
              code: key.code,
              // value: [enteredCharacter?.toLowerCase() || enteredCharacter?.toUpperCase()],
              value: key.value[1]
                ? [enteredCharacter?.toLowerCase() || "", key.value[1] || ""]
                : [enteredCharacter?.toLowerCase() || ""],
              type: enteredCharacterType,
            }
          } else {
            return key
          }
        })

        return editedKeyboard
      })
    }

    const handleOnSecondValueChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const enteredCharacter = event.nativeEvent?.data

      if (
        keyboardLanguage === "Geo" &&
        ![...georgianLetters, ...symbols].includes(enteredCharacter) &&
        enteredCharacter !== null
      ) {
        toast.warning("sorry, this character can't be used")

        return
      }

      if (
        keyboardLanguage === "Eng" &&
        ![...englishLetters, ...symbols].includes(enteredCharacter) &&
        enteredCharacter !== null
      ) {
        toast.warning("sorry, this character can't be used")

        return
      }

      if (
        uneditableKeys.includes(enteredCharacter) &&
        !keysThatWontShowWarning.includes(enteredCharacter)
      ) {
        toast.warning("this key can't be used")

        return
      }

      let enteredCharacterType =
        editingKeyboard.find(
          (key) => key.value[0] === enteredCharacter || key.value[1] === enteredCharacter
        )?.type || "Letter"

      if (!["Letter", "Digit", "Symbol"].includes(enteredCharacterType))
        enteredCharacterType = "Letter"

      // if (!enteredCharacter) return

      setEditingKeyboard((prevState) => {
        const editedKeyboard = structuredClone(prevState).map((key) => {
          if (key.code === currentlyEditing) {
            return {
              code: key.code,
              value: [
                // key.value[0] || enteredCharacter?.toLowerCase(),
                key.value[0] || "",
                enteredCharacter?.toUpperCase() || "",
              ],
              type: enteredCharacterType,
            }
          } else {
            return key
          }
        })

        return editedKeyboard
      })
    }

    return (
      <SelectedEditableKey
        editingKey={editingKey || null}
        onFirstValueChange={handleOnFirstValueChange}
        onSecondValueChange={handleOnSecondValueChange}
        wasSelectedAtLeaseOnce={wasSelectedAtLeaseOnce}
      />
    )
  }

  // renders buttons that are in the bottom right corner
  const renderRightButtons = () => {
    return (
      <div className="keyboard-right-side-buttons">
        <Button
          onClick={handleRightSideButtons}
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
                style={{ animationDelay: "400ms" }}
                to={`../guides/how_to_install_layout_on_${userOS}`}
              >
                <QuestionIcon className="icon" />
              </Link>
            </Tooltip>
            <Tooltip
              tooltipContent={t("Import")}
              tooltipPosition="bottom-center"
            >
              <Button
                onClick={handleNotImplemented}
                style={{ animationDelay: "300ms" }}
              >
                <ImportIcon className="icon" />
              </Button>
            </Tooltip>
            <Tooltip
              tooltipContent={t("Export")}
              tooltipPosition="bottom-center"
            >
              <Button
                onClick={handleNotImplemented}
                style={{ animationDelay: "300ms" }}
              >
                <ExportIcon className="icon" />
              </Button>
            </Tooltip>
            <Tooltip
              tooltipContent={t("Analyze")}
              tooltipPosition="bottom-center"
            >
              <Button
                onClick={handleNotImplemented}
                style={{ animationDelay: "200ms" }}
              >
                <AnalyzeIcon className="icon" />
              </Button>
            </Tooltip>
            <Tooltip
              tooltipContent={t("Optimize")}
              tooltipPosition="bottom-center"
            >
              <Button
                onClick={optimizeLayout}
                style={{ animationDelay: "100ms" }}
              >
                <RobotIcon className="icon" />
              </Button>
            </Tooltip>
            <Tooltip
              tooltipContent={t("Save")}
              tooltipPosition="bottom-center"
            >
              <Button
                onClick={handleOpenSaveKeyboardModal}
                style={{ animationDelay: "0ms" }}
              >
                <FloppyDiskIcon className="icon" />
              </Button>
            </Tooltip>
          </div>
        ) : null}
      </div>
    )
  }

  const renderLeftButtons = (wasKeyboardChanged: boolean) => {
    return (
      <div className="keyboard-left-side-buttons">
        <Tooltip tooltipContent={t("Erase every key")}>
          <Button
            onClick={emptyEditableKeys}
            className="empty-editable-keys-button"
          >
            <EraserIcon className="icon" />
          </Button>
        </Tooltip>
        {wasKeyboardChanged ? (
          <Tooltip tooltipContent={t("Reset keyboard")}>
            <Button
              onClick={resetKeys}
              className="reset-keys-button"
            >
              <ResetIcon className="icon" />
            </Button>
          </Tooltip>
        ) : null}
      </div>
    )
  }

  // renders action buttons under keyboard
  const renderEditableKeyboardButtons = () => {
    const compareKeyboards = (keyboard1: KeyInterface[], keyboard2: KeyInterface[]) => {
      if (keyboard1.length !== keyboard2.length) {
        return false
      }

      for (let i = 0; i < keyboard1.length; i++) {
        if (
          keyboard1[i].value[0] !== keyboard2[i].value[0] ||
          keyboard1[i].value[1] !== keyboard2[i].value[1]
        ) {
          return true
        }
      }

      return false
    }

    const wasKeyboardChanged = compareKeyboards(editingKeyboard, startingKeyboard)

    return (
      <div className="editable-keyboard-buttons">
        {renderLeftButtons(wasKeyboardChanged)}
        {renderRightButtons()}
      </div>
    )
  }

  useOnClickOutside(ref, () => {
    handleOnClickOutside()
    handleCloseRightSideButtons()
  })

  // detects user's OS
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

  // resets keyboard when user changes layout
  useEffect(() => {
    // editing keyboard will reset when user changes keyboard
    setEditingKeyboard(structuredClone(startingKeyboard))
  }, [startingKeyboard])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const pressedKey = event.code

      if (pressedKey === "Alt") event.preventDefault()

      // if (pressedKey === "Space") event.preventDefault()

      if (pressedKey === "CapsLock") {
        setPressedKeys((prevState) => {
          if (prevState.includes("CapsLock")) {
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

      if (pressedKey === "Alt" || pressedKey === "Space") event.preventDefault()

      if (pressedKey === "CapsLock") return

      setPressedKeys((prevState) => prevState.filter((key) => key !== pressedKey))
    }

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("keyup", handleKeyUnPress)

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("keyup", handleKeyUnPress)
    }
  }, [currentlyEditing, editingKeyboard])

  return (
    <div
      ref={ref}
      className="editable-keyboard-holder"
    >
      {optimizationStatus ? (
        <p>
          Generations Complete: {progress.current_generation} / {progress.total_generations}
        </p>
      ) : (
        <></>
      )}
      {renderSelectedKey()}
      <div className="editable-keyboard-content">
        <KeyboardOptions
          showSelectButton={false}
          showLanguageSelector={true}
          showKeyboardTypeSelector={true}
          showEditButton={false}
          handleEditing={handleEditing}
          showHideKeyboardButton={false}
        />
        <div
          style={{ "--key-size": `${keySize}rem` } as React.CSSProperties}
          className={`keyboard editable-keyboard keyboard-${keyboardType} ${showColoredKeys ? "" : "same-color-keys"}`}
        >
          {renderKeyboard()}
        </div>
        {renderEditableKeyboardButtons()}
        {renderSaveKeyboardLayoutModal()}
      </div>
    </div>
  )
}
export default EditableKeyboard
