import { createContext, useContext, useReducer, useEffect } from "react"

import {
  setFontAction,
  setAmountOfShownLinesAction,
  setAlignTextAction,
  setFontSizeAction,
  setLineHeightAction,
  setLetterSpacingAction,
} from "../actions/typingSettingsActions"
import typingSettingsReducer from "../reducers/typingSettingsReducers"
import {
  typingSettingsInitialState,
  defaultFont,
  defaultAmountOfShownLines,
  defaultAlignText,
  defaultFontSize,
  defaultLetterSpacing,
  defaultLineHeight,
} from "../initial/typingSettingsInitialState"
import {
  FontType,
  AmountOfShownLinesType,
  AlignTextType,
  FontSizeType,
  LineHeightType,
  LetterSpacingType,
  TypingSettingsOptionsInterface,
  TypingSettingsActions,
} from "../../types/typingSettings.types"
import { TypingSettingsState } from "../../types/typingSettings.types"
import { saveTypingSetting } from "../../services/typingSettingsServices"

import { useAuthStore } from "./authContext"
// import { AxiosError } from "axios"

// interface TypingSettingsOptionsState {
//   typingSettingsOptions: TypingSettingsOptionsInterface
// }

interface ContextInterface
  extends TypingSettingsState,
    TypingSettingsActions,
    TypingSettingsOptionsInterface {}

const TypingSettingsContext = createContext<ContextInterface>({} as ContextInterface)

// interface AxiosErrorResponse extends AxiosError {
//   message: string
// }

export const useTypingSettingsStore = () => useContext(TypingSettingsContext)

interface Props {
  children: React.ReactNode
}

const TypingSettingsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(typingSettingsReducer, typingSettingsInitialState)

  const { token, isLoggedIn, initialTypingSettings } = useAuthStore()

  const fontOptions = ["sans", "serif"] as FontType[]
  const amountOfShownLinesOptions = ["3", "4", "5", "6", "7"] as AmountOfShownLinesType[]
  const alignTextOptions = ["left", "center", "right"] as AlignTextType[]
  const fontSizeOptions = [
    "Auto",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "18",
    "24",
    "30",
    "36",
  ] as FontSizeType[]
  const lineHeightOptions = [
    "Auto",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "18",
    "24",
    "30",
    "36",
  ] as LineHeightType[]
  const letterSpacingOptions = ["0", "1", "2", "3", "4", "5", "6"] as LetterSpacingType[]

  // saves a setting both in localStorage and on the server (if saveOnServer is true or token is available)
  const saveSetting = (
    typingSettingToChange: string,
    value: string | number | boolean,
    saveOnServer: boolean
  ) => {
    localStorage.setItem(typingSettingToChange, value.toString())

    if (!token || !saveOnServer) return

    saveTypingSetting(typingSettingToChange, value, token)
  }

  // sets multiple typing settings
  const setTypingSettings = (settings: TypingSettingsState, saveOnServer: boolean = true) => {
    setFont(settings.font, saveOnServer)
    setAmountOfShownLines(settings.amountOfShownLines, saveOnServer)
    setAlignText(settings.alignText, saveOnServer)
    setFontSize(settings.fontSize, saveOnServer)
    setLineHeight(settings.lineHeight, saveOnServer)
    setLetterSpacing(settings.letterSpacing, saveOnServer)
  }

  const setFont = (newValue: FontType, saveOnServer: boolean = true) => {
    // saves font to the localStorage and on a server (if user is logged in)
    saveSetting("font", newValue, saveOnServer)
    // changes font on the reducer state
    dispatch(setFontAction(newValue))
  }

  const setAmountOfShownLines = (
    newValue: AmountOfShownLinesType,
    saveOnServer: boolean = true
  ) => {
    saveSetting("amountOfShownLines", newValue, saveOnServer)
    dispatch(setAmountOfShownLinesAction(newValue))
  }

  const setAlignText = (newValue: AlignTextType, saveOnServer: boolean = true) => {
    saveSetting("alignText", newValue, saveOnServer)
    dispatch(setAlignTextAction(newValue))
  }

  const setFontSize = (newValue: FontSizeType, saveOnServer: boolean = true) => {
    saveSetting("fontSize", newValue, saveOnServer)
    dispatch(setFontSizeAction(newValue))
  }

  const setLineHeight = (newValue: LineHeightType, saveOnServer: boolean = true) => {
    saveSetting("lineHeight", newValue, saveOnServer)
    dispatch(setLineHeightAction(newValue))
  }

  const setLetterSpacing = (newValue: LetterSpacingType, saveOnServer: boolean = true) => {
    saveSetting("letterSpacing", newValue, saveOnServer)
    dispatch(setLetterSpacingAction(newValue))
  }

  // resets typing settings
  const resetTypingSettings = () => {
    setTypingSettings({
      font: defaultFont,
      amountOfShownLines: defaultAmountOfShownLines,
      alignText: defaultAlignText,
      fontSize: defaultFontSize,
      lineHeight: defaultLineHeight,
      letterSpacing: defaultLetterSpacing,
    })
  }

  // is used to change settings back to default when user logs out / log in.
  // it works, but it's probably an anti-pattern, it would be better to use one global store (combine appSettingsContext, authContext and typingSettingsContext) for everything, so it will be possible to call resetAppSettings() inside logout/login/register functions of AuthStore.
  useEffect(() => {
    if (isLoggedIn) {
      setTypingSettings(initialTypingSettings, false)
    } else {
      resetTypingSettings()
    }
  }, [isLoggedIn, initialTypingSettings])

  const store = {
    ...state,
    //
    fontOptions,
    amountOfShownLinesOptions,
    alignTextOptions,
    fontSizeOptions,
    lineHeightOptions,
    letterSpacingOptions,
    //
    setTypingSettings,
    //
    setFont,
    setAmountOfShownLines,
    setAlignText,
    setFontSize,
    setLineHeight,
    setLetterSpacing,
    //
    resetTypingSettings,
  }

  return <TypingSettingsContext.Provider value={store}>{children}</TypingSettingsContext.Provider>
}

export default TypingSettingsProvider
