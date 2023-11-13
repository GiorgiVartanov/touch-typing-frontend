import {
  userType,
  registerCredentialsInterface,
  loginCredentialsInterface,
} from "../../types/auth.types"
import { AppSettingsState } from "../../types/appSettings.types"
import { TypingSettingsState } from "../../types/typingSettings.types"
import { defaultTheme, defaultLanguage } from "./appSettingsInitial"
import {
  defaultFont,
  defaultAlignText,
  defaultAmountOfShownLines,
  defaultFontSize,
  defaultLetterSpacing,
  defaultLineHeight,
} from "./typingSettingsInitialState"

const user: userType | null = JSON.parse(localStorage.getItem("user") || "{}")
const token: string | null = localStorage.getItem("token")
const isLoggedIn: boolean | null = JSON.parse(localStorage.getItem("isLoggedIn") || "false")
const tokenExpirationDate: number | null = Number(localStorage.getItem("tokenExpirationDate"))

export interface AuthState {
  isLoggedIn: boolean
  user: userType | null
  token: string | null
  tokenExpirationDate: number | null
  isLoading: boolean
  isError: boolean
  registerErrorMessage: string | null
  loginErrorMessage: string | null
  initialAppSettings: AppSettingsState
  initialTypingSettings: TypingSettingsState
}

export interface AuthFunctions {
  registerUser: (credentials: registerCredentialsInterface) => Promise<void>
  loginUser: (credentials: loginCredentialsInterface) => Promise<void>
  logoutUser: () => void
  // checkTokenExpiration: () => void
}

export const initialState: AuthState = {
  isLoggedIn: isLoggedIn || false,
  user: user || null,
  token: token || null,
  tokenExpirationDate: tokenExpirationDate || null,
  isLoading: false,
  isError: false,
  registerErrorMessage: null,
  loginErrorMessage: null,
  initialAppSettings: { theme: defaultTheme, language: defaultLanguage },
  initialTypingSettings: {
    font: defaultFont,
    alignText: defaultAlignText,
    amountOfShownLines: defaultAmountOfShownLines,
    fontSize: defaultFontSize,
    letterSpacing: defaultLetterSpacing,
    lineHeight: defaultLineHeight,
  },
}
