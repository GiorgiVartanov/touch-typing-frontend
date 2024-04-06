import { createContext, useContext, useReducer, useEffect } from "react"
import { useTranslation } from "react-i18next"

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
  const { i18n } = useTranslation()

  const [state, dispatch] = useReducer(appSettingsReducer, appSettingsInitialState)

  const { token } = useAuthStore()

  const languageOptions = ["System Default", "Geo", "En"] as LanguageType[]
  const themeOptions = ["System Default", "Dark", "Light"] as ThemeType[]

  // saves a setting in the localStorage and on the server (if saveOnServer is true and a token is available)
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

    let languageToApply = "en"

    if (newValue === "System Default") {
      // user's browser's language
      const systemDefaultLanguage = navigator.language.split("-")[0]

      if (systemDefaultLanguage === "ka") languageToApply = "geo"
      else languageToApply = "en"
    } else {
      languageToApply = newValue.toLowerCase()
    }

    i18n.changeLanguage(languageToApply)
  }

  // resets all settings to default values
  const resetAppSettings = () => {
    setAppSettings()
  }

  useEffect(() => {
    let languageToApply = "en"

    if (state.language === "System Default") {
      const systemDefaultLanguage = navigator.language.split("-")[0]

      if (systemDefaultLanguage === "ka") languageToApply = "geo"
      else languageToApply = "en"
    } else {
      languageToApply = state.language.toLowerCase()
    }

    i18n.changeLanguage(languageToApply)
  }, [])

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
