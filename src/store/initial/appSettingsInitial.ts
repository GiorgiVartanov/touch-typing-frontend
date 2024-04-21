import { ThemeType, LanguageType, AppSettingsState } from "../../types/appSettings.types"

const theme: ThemeType | null = localStorage.getItem("theme") as ThemeType
const language: LanguageType | null = localStorage.getItem("language") as LanguageType

export const defaultTheme = "System Default"
export const defaultLanguage = "Eng"

export const appSettingsInitialState: AppSettingsState = {
  theme: theme || defaultTheme,
  language: language || defaultLanguage,
}
