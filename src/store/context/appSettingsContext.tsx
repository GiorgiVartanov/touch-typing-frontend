import { createContext, useContext, useReducer } from "react"

import { setThemeAction, setLanguageAction } from "../actions/appSettingsActions"
import { LanguageType, ThemeType } from "../../types/appSettings.types"
import appSettingsReducer from "../reducers/appSettingsReducer"
import {
  appSettingsInitialState,
  defaultTheme,
  defaultLanguage,
} from "../initial/appSettingsInitial"
import {
  AppSettingsState,
  AppSettingsActions,
  AppSettingsOptions,
} from "../../types/appSettings.types"
import { useAuthStore } from "./authContext"
import { saveAppSetting } from "../../services/appSettingsServices"

interface ContextInterface extends AppSettingsState, AppSettingsActions, AppSettingsOptions {}

const AppSettingsContext = createContext<ContextInterface>({} as ContextInterface)

export const useAppSettingsStore = () => useContext(AppSettingsContext)

interface Props {
  children: React.ReactNode
}

const AppSettingsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appSettingsReducer, appSettingsInitialState)

  const { token } = useAuthStore()

  const themeOptions = ["System Default", "Dark", "Light"] as ThemeType[]
  const languageOptions = ["Geo", "Eng"] as LanguageType[]

  // saves a setting both in localStorage and on the server (if saveOnServer is true or token is available)
  const saveSetting = (
    appSettings: string,
    value: string | number | boolean,
    saveOnServer: boolean = true
  ) => {
    localStorage.setItem(appSettings, value.toString())

    if (!token || !saveOnServer) return

    saveAppSetting(appSettings, value, token)
  }

  // sets multiple app settings
  const setAppSettings = (
    settings: AppSettingsState = { theme: defaultTheme, language: defaultLanguage },
    saveOnServer: boolean = true
  ) => {
    // saves theme to the localStorage and on a server (if user is logged in)
    setTheme(settings.theme, saveOnServer)
    // changes theme on the reducer state
    setLanguage(settings.language, saveOnServer)
  }

  const setTheme = (newValue: ThemeType, saveOnServer: boolean = true) => {
    saveSetting("theme", newValue, saveOnServer)
    dispatch(setThemeAction(newValue))
  }

  const setLanguage = (newValue: LanguageType, saveOnServer: boolean = true) => {
    saveSetting("language", newValue, saveOnServer)
    dispatch(setLanguageAction(newValue))
  }

  // resets all settings to default values
  const resetAppSettings = () => {
    setAppSettings()
  }

  const store = {
    ...state,
    themeOptions,
    languageOptions,
    setAppSettings,
    setTheme,
    setLanguage,
    resetAppSettings,
  }

  return <AppSettingsContext.Provider value={store}>{children}</AppSettingsContext.Provider>
}

export default AppSettingsProvider
