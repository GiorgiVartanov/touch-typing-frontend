import {
  UserData,
  RegisterCredentials,
  LoginCredentials,
  LoginCredentialsError,
  RegisterCredentialsError,
} from "../../types/auth.types"

const user: UserData | null = JSON.parse(localStorage.getItem("user") || "{}")
const token: string | null = localStorage.getItem("token")
const isLoggedIn: boolean | null = JSON.parse(localStorage.getItem("isLoggedIn") || "false")
const tokenExpirationDate: number | null = Number(localStorage.getItem("tokenExpirationDate"))

export interface AuthState {
  isLoggedIn: boolean
  user: UserData | null
  token: string | null
  tokenExpirationDate: number | null
  isLoading: boolean
  isError: boolean
  registerErrorMessage: RegisterCredentialsError
  loginErrorMessage: LoginCredentialsError
  rating: number
}

export interface AuthFunctions {
  registerUser: (credentials: RegisterCredentials) => Promise<void> | Promise<LoginCredentialsError>

  resetRegisterUsernameError: () => void
  resetRegisterPasswordError: () => void
  resetRegisterConfirmPasswordError: () => void

  loginUser: (credentials: LoginCredentials) => Promise<void> | Promise<RegisterCredentialsError>

  resetLoginUsernameError: () => void
  resetLoginPasswordError: () => void

  logoutUser: () => void

  addUserToSentFriendRequests: (friendUsername: string) => void

  resetUser: (user: UserData) => void
}

export const initialState: AuthState = {
  isLoggedIn: isLoggedIn || false,
  user: user || null,
  token: token || null,
  tokenExpirationDate: tokenExpirationDate || null,
  isLoading: false,
  isError: false,
  registerErrorMessage: { usernameError: [], passwordError: [], confirmPasswordError: [] },
  loginErrorMessage: { usernameError: [], passwordError: [] },
  rating: 0,
}
