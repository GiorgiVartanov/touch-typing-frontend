import { UserData, RegisterCredentialsError, LoginCredentialsError } from "../../types/auth.types"

export const SET_USER = "SET_USER"
export const SET_TOKEN = "SET_TOKEN"
export const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN"
export const SET_LOADING = "SET_LOADING"
export const SET_ERROR = "SET_ERROR"
export const SET_REGISTER_ERROR_MESSAGE = "SET_REGISTER_ERROR_MESSAGE"
export const SET_LOGIN_ERROR_MESSAGE = "SET_LOGIN_ERROR_MESSAGE"
export const SET_TOKEN_EXPIRATION_DATE = "SET_TOKEN_EXPIRATION_DATE"

export const setUser = (
  user: UserData | null
): { type: typeof SET_USER; payload: UserData | null } => ({
  type: SET_USER,
  payload: user,
})

export const setToken = (
  token: string | null
): { type: typeof SET_TOKEN; payload: string | null } => ({
  type: SET_TOKEN,
  payload: token,
})

export const setIsLoggedIn = (
  isLoggedIn: boolean
): { type: typeof SET_IS_LOGGED_IN; payload: boolean } => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
})

export const setIsLoading = (
  isLoading: boolean
): { type: typeof SET_LOADING; payload: boolean } => ({
  type: SET_LOADING,
  payload: isLoading,
})

export const setIsError = (isError: boolean): { type: typeof SET_ERROR; payload: boolean } => ({
  type: SET_ERROR,
  payload: isError,
})

export const setRegisterErrorMessage = (
  registerError: RegisterCredentialsError
): { type: typeof SET_REGISTER_ERROR_MESSAGE; payload: RegisterCredentialsError } => ({
  type: SET_REGISTER_ERROR_MESSAGE,
  payload: registerError,
})

export const setLoginErrorMessage = (
  loginError: LoginCredentialsError
): {
  type: typeof SET_LOGIN_ERROR_MESSAGE
  payload: LoginCredentialsError
} => ({
  type: SET_LOGIN_ERROR_MESSAGE,
  payload: loginError,
})

export const setTokenExpirationDate = (
  tokenExpirationDate: number
): { type: typeof SET_TOKEN_EXPIRATION_DATE; payload: number } => ({
  type: SET_TOKEN_EXPIRATION_DATE,
  payload: tokenExpirationDate,
})
