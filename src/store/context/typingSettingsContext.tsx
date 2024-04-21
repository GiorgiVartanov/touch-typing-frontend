import { createContext, useContext, useReducer, useEffect } from "react"

import {
  setKeyboardLanguageAction,
  setKeyboardLayoutAction,
  setKeyboardTypeAction,
  setFontAction,
  setFontSizeAction,
} from "../actions/typingSettingsActions"
import typingSettingsReducer from "../reducers/typingSettingsReducers"
import { typingSettingsInitialState } from "../initial/typingSettingsInitialState"
import {
  KeyboardLanguageType,
  savedKeyboardLayoutInterface,
  KeyboardTypeType,
  FontType,
  FontSizeType,
  TypingSettingsOptions,
  TypingSettingsActions,
} from "../../types/typer.types/typingSettings.types"
import { TypingSettingsState } from "../../types/typer.types/typingSettings.types"
import {
  saveTypingSetting,
  getTypingSettings,
  getLayout,
  saveLayout,
} from "../../services/typingSettingsServices"

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

  const keyboardLanguageOptions: KeyboardLanguageType[] = ["Geo", "Eng"]
  const keyboardTypeOptions: KeyboardTypeType[] = ["ANSI", "ANSI-ISO", "ISO"]
  const fontOptions: FontType[] = ["sans", "serif", "sanet"]
  const fontSizeOptions: FontSizeType[] = ["small", "medium", "large", "extra large"]

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

  const setKeyboardLanguage = (newValue: KeyboardLanguageType, saveOnServer: boolean = true) => {
    saveSetting("keyboardLanguage", newValue, saveOnServer)
    dispatch(setKeyboardLanguageAction(newValue))
  }

  const setKeyboardLayout = (
    newValue: savedKeyboardLayoutInterface,
    saveOnServer: boolean = true
  ) => {
    if (token && saveOnServer) {
      saveLayout(newValue, token)
    }

    localStorage.setItem("keyboardLayout", JSON.stringify(newValue))

    dispatch(setKeyboardLayoutAction(newValue))
  }

  const setKeyboardType = (newValue: KeyboardTypeType, saveOnServer: boolean = true) => {
    saveSetting("keyboardType", newValue, saveOnServer)
    dispatch(setKeyboardTypeAction(newValue))
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

  // resets all settings to default values
  const resetTypingSettings = () => {
    const { keyboardLanguage, keyboardLayout, keyboardType, font, fontSize } =
      typingSettingsInitialState

    setKeyboardLanguage(keyboardLanguage, false)
    setKeyboardLayout(keyboardLayout, false)
    setKeyboardType(keyboardType, false)
    setFont(font, false)
    setFontSize(fontSize, false)
  }

  useEffect(() => {
    const fetchTypingSettings = async () => {
      if (!token) return

      // fetch typing settings for the current user from the server
      const fetchedSettings = await getTypingSettings(token)
      const fetchedLayout = await getLayout(token)

      const { font, fontSize, keyboardType, keyboardLanguage } = fetchedSettings.data
      const layout = fetchedLayout.data

      dispatch(setFontAction(font))
      dispatch(setFontSizeAction(fontSize))
      dispatch(setKeyboardLanguageAction(keyboardLanguage))
      dispatch(setKeyboardTypeAction(keyboardType))

      dispatch(setKeyboardLayoutAction(layout))
    }

    if (token) {
      fetchTypingSettings()
    } else {
      resetTypingSettings()
    }
  }, [token])

  const store = {
    ...state,
    fontOptions,
    fontSizeOptions,
    keyboardLanguageOptions,
    keyboardTypeOptions,
    setKeyboardLanguage,
    setKeyboardLayout,
    setKeyboardType,
    setFont,
    setFontSize,
    resetTypingSettings,
  }

  return <TypingSettingsContext.Provider value={store}>{children}</TypingSettingsContext.Provider>
}

export default TypingSettingsProvider
