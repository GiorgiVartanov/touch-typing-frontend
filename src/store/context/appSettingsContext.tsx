import { createContext, useContext, useReducer, useEffect } from "react"

import {
  setPreferredTheme,
  setPreferredLanguage,
  setProfileVisibility,
  setFavoriteLayout,
  setPreferredTypingLanguage,
} from "../actions/appSettingsActions"
import {
  PreferredLanguageType,
  ThemeType,
  LayoutType,
  PreferredTypingLanguageType,
} from "../../types/appSettings.types"
import appSettingsReducer from "../reducers/appSettingsReducer"
import { appSettingsInitialState } from "../initial/appSettingsInitial"
import { AppSettingsInterface } from "../../types/appSettings.types"
import { useAuthStore } from "./authContext"
import { saveAppSetting } from "../../services/appSettingsServices"

interface AppSettingsListInterface {}

interface ContextInterface extends AppSettingsInterface, AppSettingsListInterface {
  setFetchedSettings: (settings: AppSettingsInterface) => void
  changeSetting: (settingName: string, value: string | number | boolean) => void
}

const AppSettingsContext = createContext<ContextInterface>({} as ContextInterface)

export const useAppSettingsStore = () => useContext(AppSettingsContext)

interface Props {
  children: React.ReactNode
}

const AppSettingsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(appSettingsReducer, appSettingsInitialState)

  const { token, user } = useAuthStore()

  // this function is called in a useEffect bellow after user is updated (registered/logged in), it sets settings to the one on user object (I am not sure if its a best practice, I may change it latter)
  const setFetchedSettings = () => {
    if (!user || !token) return

    const savedAppSettings = user.appSettings

    changeSetting("preferredTheme", savedAppSettings.preferredTheme as ThemeType, false)
    changeSetting(
      "preferredLanguage",
      savedAppSettings.preferredLanguage as PreferredLanguageType,
      false
    )
    changeSetting("isProfilePublic", savedAppSettings.isProfilePublic as boolean, false)
    changeSetting("favoriteLayout", savedAppSettings.favoriteLayout as LayoutType, false)
    changeSetting(
      "preferredTypingLanguage",
      savedAppSettings.preferredLanguage as PreferredTypingLanguageType,
      false
    )
  }

  // also, not sure about that
  const setDefaultSettings = () => {
    changeSetting("preferredTheme", appSettingsInitialState.preferredTheme as ThemeType, false)
    changeSetting(
      "preferredLanguage",
      appSettingsInitialState.preferredLanguage as PreferredLanguageType,
      false
    )
    changeSetting("isProfilePublic", appSettingsInitialState.isProfilePublic as boolean, false)
    changeSetting("favoriteLayout", appSettingsInitialState.favoriteLayout as LayoutType, false)
    changeSetting(
      "preferredTypingLanguage",
      appSettingsInitialState.preferredLanguage as PreferredTypingLanguageType,
      false
    )
  }

  // saves passed setting in a localstorage
  const saveSettingToLocalstorage = (settingName: string, newValue: string | number | boolean) => {
    localStorage.setItem(settingName, newValue.toString())
  }

  // saves passed setting on a backend
  const saveSettingOnServer = (settingName: string, newValue: string | number | boolean) => {
    // debouncing will be implemented latter, so the request to the backend will be sent if user has not changed setting in a ~10 seconds, it would prevent server from getting unnecessary request if someone decides to "play" with settings

    if (!token) return

    try {
      saveAppSetting(settingName, newValue, token)
    } catch (error) {
      console.log(error)
    }
  }

  // saves passed setting in a store
  const dispatchSetting = (settingName: string, newValue: string | number | boolean) => {
    switch (settingName) {
      case "preferredTheme":
        dispatch(setPreferredTheme(newValue as ThemeType))
        break
      case "preferredLanguage":
        dispatch(setPreferredLanguage(newValue as PreferredLanguageType))
        break
      case "isProfilePublic":
        dispatch(setProfileVisibility(newValue as boolean))
        break
      case "favoriteLayout":
        dispatch(setFavoriteLayout(newValue as LayoutType))
        break
      case "preferredTypingLanguage":
        dispatch(setPreferredTypingLanguage(newValue as PreferredTypingLanguageType))
        break
      default:
        break
    }
  }

  const changeSetting = (
    settingName: string,
    newValue: string | number | boolean,
    saveOnServer: boolean = true
  ) => {
    if (!newValue) return

    saveSettingToLocalstorage(settingName, newValue)
    dispatchSetting(settingName, newValue)

    if (!saveOnServer) return

    saveSettingOnServer(settingName, newValue)
  }

  useEffect(() => {
    if (user) setFetchedSettings()
    else setDefaultSettings()
  }, [user])

  const store = {
    ...state,
    setFetchedSettings,
    changeSetting,
  }

  return <AppSettingsContext.Provider value={store}>{children}</AppSettingsContext.Provider>
}

export default AppSettingsProvider
