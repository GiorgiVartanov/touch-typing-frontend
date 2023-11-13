import { createContext, useContext, useReducer, useEffect } from "react"

import { setThemeAction, setLanguageAction } from "../actions/appSettingsActions"
import { LanguageType, ThemeType } from "../../types/appSettings.types"
import appSettingsReducer from "../reducers/appSettingsReducer"
import {
  appSettingsInitialState,
  defaultTheme,
  defaultLanguage,
} from "../initial/appSettingsInitial"
import { AppSettingsState, AppSettingsActions } from "../../types/appSettings.types"
import { useAuthStore } from "./authContext"
import { saveAppSetting } from "../../services/appSettingsServices"

interface ContextInterface extends AppSettingsState, AppSettingsActions {}

const AppSettingsContext = createContext<ContextInterface>({} as ContextInterface)

export const useAppSettingsStore = () => useContext(AppSettingsContext)

interface Props {
  children: React.ReactNode
}

const AppSettingsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appSettingsReducer, appSettingsInitialState)

  const { token, isLoggedIn, initialAppSettings } = useAuthStore()

  const themeOptions = ["System Default", "Dark", "Light"] as ThemeType[]
  const languageOptions = ["Geo"] as LanguageType[]

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

  // is used to change settings back to default when user logs out / log in.
  // it works, but it's probably an anti-pattern, it would be better to use one global store (combine appSettingsContext, authContext and typingSettingsContext) for everything, so it will be possible to call resetAppSettings() inside logout/login/register functions of AuthStore.
  useEffect(() => {
    if (isLoggedIn) {
      setAppSettings(initialAppSettings, false)
    } else {
      resetAppSettings()
    }
  }, [isLoggedIn, initialAppSettings])

  const store = {
    ...state,
    //
    themeOptions,
    languageOptions,
    //
    setAppSettings,
    setTheme,
    setLanguage,
    //
    resetAppSettings,
  }

  return <AppSettingsContext.Provider value={store}>{children}</AppSettingsContext.Provider>
}

export default AppSettingsProvider
