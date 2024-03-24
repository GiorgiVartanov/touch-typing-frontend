import { createContext, useContext, useReducer, useEffect } from "react"

import {
  setTypingLanguageAction,
  setFontAction,
  setFontSizeAction,
} from "../actions/typingSettingsActions"
import typingSettingsReducer from "../reducers/typingSettingsReducers"
import {
  typingSettingsInitialState,
  defaultFont,
  defaultFontSize,
} from "../initial/typingSettingsInitialState"
import {
  TypingLanguageType,
  FontType,
  FontSizeType,
  TypingSettingsOptions,
  TypingSettingsActions,
} from "../../types/typer.types/typingSettings.types"
import { TypingSettingsState } from "../../types/typer.types/typingSettings.types"
import { saveTypingSetting, getTypingSettings } from "../../services/typingSettingsServices"

import { useAuthStore } from "./authContext"

interface ContextInterface
  extends TypingSettingsState,
    TypingSettingsActions,
    TypingSettingsOptions {}

const TypingSettingsContext = createContext<ContextInterface>({} as ContextInterface)

export const useTypingSettingsStore = () => useContext(TypingSettingsContext)

interface Props {
  children: React.ReactNode
}

const TypingSettingsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(typingSettingsReducer, typingSettingsInitialState)

  const { token } = useAuthStore()

  const typingLanguageOptions = [
    "QWERTY",
    "QWERTY georgian",
    "Dvorak",
    "Colemak",
    "Workman",
  ] as TypingLanguageType[]
  const fontOptions = ["sans", "serif", "sanet"] as FontType[]
  const fontSizeOptions = ["small", "medium", "large", "extra large"] as FontSizeType[]

  // saves a setting in the localStorage and on the server (if saveOnServer is true and a token is available)
  const saveSetting = (
    typingSettingToChange: string,
    value: string | number | boolean,
    saveOnServer: boolean
  ) => {
    localStorage.setItem(typingSettingToChange, value.toString())

    if (!token || !saveOnServer) return

    saveTypingSetting(typingSettingToChange, value, token)
  }

  const setTypingLanguage = (newValue: TypingLanguageType, saveOnServer: boolean = true) => {
    saveSetting("typingLanguage", newValue, saveOnServer)
    dispatch(setTypingLanguageAction(newValue))
  }

  const setFont = (newValue: FontType, saveOnServer: boolean = true) => {
    // saves font to the localStorage and on a server (if user is logged in)
    saveSetting("font", newValue, saveOnServer)
    // changes font in the reducer state
    dispatch(setFontAction(newValue))
  }

  const setFontSize = (newValue: FontSizeType, saveOnServer: boolean = true) => {
    saveSetting("fontSize", newValue, saveOnServer)
    dispatch(setFontSizeAction(newValue))
  }

  // resets typing settings
  const resetTypingSettings = () => {
    setFont(defaultFont)
    setFontSize(defaultFontSize)
  }

  useEffect(() => {
    const fetchTypingSettings = async () => {
      if (!token) return

      // fetch typing settings for the current user from the server
      const fetchedSettings = await getTypingSettings(token)

      const { font, fontSize } = fetchedSettings.data

      dispatch(setFontAction(font))
      dispatch(setFontSizeAction(fontSize))
    }

    if (token) {
      fetchTypingSettings()
    } else {
      // resetTypingSettings()
    }
  }, [token])

  const store = {
    ...state,
    typingLanguageOptions,
    fontOptions,
    fontSizeOptions,
    setTypingLanguage,
    setFont,
    setFontSize,
    resetTypingSettings,
  }

  return <TypingSettingsContext.Provider value={store}>{children}</TypingSettingsContext.Provider>
}

export default TypingSettingsProvider
