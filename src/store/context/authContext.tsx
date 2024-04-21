import { createContext, useContext, useEffect, useReducer } from "react"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

import {
  LoginCredentials,
  RegisterCredentials,
  LoginCredentialsError,
  RegisterCredentialsError,
} from "../../types/auth.types"
import {
  setUser,
  setToken,
  setIsLoggedIn,
  setIsLoading,
  setIsError,
  setRegisterErrorMessage,
  setLoginErrorMessage,
  setTokenExpirationDate,
} from "../actions/authActions"

import { login, register } from "../../services/authServices"
import authReducer from "../reducers/authReducers"
import { initialState } from "../initial/authInitialState"
import { AuthState, AuthFunctions } from "../initial/authInitialState"

const AuthContext = createContext<AuthState & AuthFunctions>({} as AuthState & AuthFunctions)

export const useAuthStore = () => useContext(AuthContext)

interface Props {
  children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const registerUser = async (userData: RegisterCredentials) => {
    try {
      dispatch(setIsLoading(true))

      const data = await register(userData)
      const { user, token } = data.data

      // resetTypingSettings()
      // resetAppSettings()

      dispatch(setUser(user))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))

      const expirationDate = Number(new Date()) + 24 * 60 * 60 * 1000

      dispatch(setTokenExpirationDate(expirationDate))

      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      localStorage.setItem("tokenExpirationDate", JSON.stringify(expirationDate))

      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsError(true))

      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data as RegisterCredentialsError

        dispatch(setRegisterErrorMessage(errorMessage))
      } else {
        console.error(error)
      }

      dispatch(setIsLoading(false))
    }
  }

  const resetRegisterUsernameError = () => {
    dispatch(
      setRegisterErrorMessage({
        usernameError: [],
        passwordError: state.registerErrorMessage.passwordError,
        confirmPasswordError: state.registerErrorMessage.confirmPasswordError,
      })
    )
  }

  const resetRegisterPasswordError = () => {
    dispatch(
      setRegisterErrorMessage({
        usernameError: [],
        passwordError: [],
        confirmPasswordError: state.registerErrorMessage.confirmPasswordError,
      })
    )
  }

  const resetRegisterConfirmPasswordError = () => {
    dispatch(
      setRegisterErrorMessage({
        usernameError: state.registerErrorMessage.usernameError,
        passwordError: state.registerErrorMessage.passwordError,
        confirmPasswordError: [],
      })
    )
  }

  const loginUser = async (userData: LoginCredentials) => {
    try {
      dispatch(setIsLoading(true))

      const data = await login(userData)
      const { user, token } = data.data

      console.log(data)

      dispatch(setUser(user))
      dispatch(setToken(token))
      dispatch(setIsLoggedIn(true))

      const expirationDate = Number(new Date()) + 24 * 60 * 60 * 1000

      dispatch(setTokenExpirationDate(expirationDate))

      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("token", token)
      localStorage.setItem("isLoggedIn", JSON.stringify(true))
      localStorage.setItem("tokenExpirationDate", JSON.stringify(expirationDate))

      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsError(true))

      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data as LoginCredentialsError

        dispatch(setLoginErrorMessage(errorMessage))
      } else {
        console.error(error)
      }

      dispatch(setIsLoading(false))
    }
  }

  const resetLoginUsernameError = () => {
    dispatch(
      setLoginErrorMessage({
        usernameError: [],
        passwordError: state.loginErrorMessage.passwordError,
      })
    )
  }

  const resetLoginPasswordError = () => {
    dispatch(
      setLoginErrorMessage({
        usernameError: state.loginErrorMessage.usernameError,
        passwordError: [],
      })
    )
  }

  const logoutUser = () => {
    // localStorage.removeItem("user")
    // localStorage.removeItem("token")
    // localStorage.setItem("isLoggedIn", JSON.stringify(false))

    localStorage.clear() // removes everything from localstorage

    dispatch(setIsLoggedIn(false))
    dispatch(setToken(null))
    dispatch(setUser(null))
  }

  // redo
  const addUserToSentFriendRequests = (friendUsername: string) => {
    const currentUser = state.user

    if (!currentUser) return

    console.log(currentUser)

    currentUser.sentFriendRequests.push(friendUsername)
    localStorage.setItem("user", JSON.stringify(currentUser))

    dispatch(setUser(currentUser))
  }

  const checkTokenExpiration = () => {
    const isLoggedIn = state.isLoggedIn

    if (!isLoggedIn) return

    const currentDate = Number(new Date())
    const tokenExpirationDate = state.tokenExpirationDate

    if (!tokenExpirationDate) return

    if (currentDate >= tokenExpirationDate) {
      logoutUser()

      toast.warning("your session token has expired, please log in again")
    }
  }

  useEffect(() => {
    checkTokenExpiration()
  }, [])

  const store = {
    ...state,
    registerUser,
    resetRegisterUsernameError,
    resetRegisterPasswordError,
    resetRegisterConfirmPasswordError,
    loginUser,
    resetLoginUsernameError,
    resetLoginPasswordError,
    logoutUser,
    addUserToSentFriendRequests,
  }

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>
}

export default AuthProvider
