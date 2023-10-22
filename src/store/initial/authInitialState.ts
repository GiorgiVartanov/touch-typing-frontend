import {
  userType,
  registerCredentialsInterface,
  loginCredentialsInterface,
} from "../../types/auth.types"

const user: userType | null = JSON.parse(localStorage.getItem("user") || "{}")
const token: string | null = localStorage.getItem("token")
const isLoggedIn: boolean | null = JSON.parse(localStorage.getItem("isLoggedIn") || "false")

export interface AuthState {
  isLoggedIn: boolean
  user: userType | null
  token: string | null
  isLoading: boolean
  isError: boolean
  registerErrorMessage: string | null
  loginErrorMessage: string | null
}

export interface AuthFunctions {
  registerUser: (credentials: registerCredentialsInterface) => Promise<void>
  loginUser: (credentials: loginCredentialsInterface) => Promise<void>
  logoutUser: () => void
}

export const initialState: AuthState = {
  isLoggedIn: isLoggedIn || false,
  user: user || null,
  token: token || null,
  isLoading: false,
  isError: false,
  registerErrorMessage: null,
  loginErrorMessage: null,
}
