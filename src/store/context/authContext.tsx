import { createContext, useContext, useReducer } from "react"
import { AxiosError } from "axios"

import { loginCredentialsInterface, registerCredentialsInterface } from "../../types/auth.types"
import {
  setUser,
  setToken,
  setIsLoggedIn,
  setIsLoading,
  setIsError,
  setRegisterErrorMessage,
  setLoginErrorMessage,
  setInitialAppSettings,
  setInitialTypingSettings,
} from "../actions/authActions"
import { defaultTheme, defaultLanguage } from "../initial/appSettingsInitial"

import { login, register } from "../../services/authServices"
import authReducer from "../reducers/authReducers"
import { initialState } from "../initial/authInitialState"
import { AuthState, AuthFunctions } from "../initial/authInitialState"

// import { useTypingSettingsStore } from "./typingSettingsContext"
// import { useAppSettingsStore } from "./appSettingsContext"

const AuthContext = createContext<AuthState & AuthFunctions>({} as AuthState & AuthFunctions)

interface AxiosErrorResponse extends AxiosError {
  message: string
}

export const useAuthStore = () => useContext(AuthContext)

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  // const { setTypingSettings, resetTypingSettings } = useTypingSettingsStore()
  // const { setAppSettings, resetAppSettings } = useAppSettingsStore()

  const registerUser = async (userData: registerCredentialsInterface) => {
    try {
      dispatch(setIsLoading(true))

      const data = await register(userData)
      const { user, typingSettings, appSettings, token } = data.data

      // resetTypingSettings()
      // resetAppSettings()

      dispatch(setUser(user))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))

      dispatch(setInitialTypingSettings(typingSettings))
      dispatch(setInitialAppSettings(appSettings))

      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", JSON.stringify(true))

      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsError(true))

      if (error instanceof AxiosError) {
        dispatch(setRegisterErrorMessage((error?.response?.data as AxiosErrorResponse)?.message))
      } else {
        console.log(error)
        dispatch(setRegisterErrorMessage("unexpected error"))
      }

      dispatch(setIsLoading(false))
    }
  }

  const loginUser = async (userData: loginCredentialsInterface) => {
    try {
      dispatch(setIsLoading(true))

      // resetTypingSettings()
      // resetAppSettings()

      const data = await login(userData)
      const { user, typingSettings, appSettings, token } = data.data
      // const typerSettings = user.typerSettings

      // setFetchedSettings(typerSettings)

      dispatch(setUser(user))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))

      dispatch(setInitialTypingSettings(typingSettings))
      dispatch(setInitialAppSettings(appSettings))

      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", JSON.stringify(true))

      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsError(true))

      if (error instanceof AxiosError) {
        dispatch(setLoginErrorMessage((error?.response?.data as AxiosErrorResponse)?.message))
      } else {
        console.log(error)
        dispatch(setRegisterErrorMessage("unexpected error"))
      }

      dispatch(setIsLoading(false))
    }
  }

  const logoutUser = () => {
    // localStorage.removeItem("user")
    // localStorage.removeItem("token")
    // localStorage.setItem("isLoggedIn", JSON.stringify(false))

    localStorage.clear() // removes everything from localstorage

    dispatch(setIsLoggedIn(false))
    dispatch(setToken(null))
    dispatch(setUser(null))

    // dispatch(setInitialTypingSettings({}))
    dispatch(setInitialAppSettings({ theme: defaultTheme, language: defaultLanguage }))

    // resetTypingSettings()
    // resetAppSettings()
  }

  const store = {
    ...state,
    registerUser,
    loginUser,
    logoutUser,
  }

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export default AuthProvider
