export type LanguageType = "System Default" | "Geo" | "Eng"
export type ThemeType = "System Default" | "Dark" | "Light"

export interface AppSettingsState {
  language: LanguageType
  theme: ThemeType
}

export interface AppSettingsOptions {
  languageOptions: LanguageType[]
  themeOptions: ThemeType[]
}

export interface AppSettingsActions {
  setAppSettings: (appSettings: AppSettingsState) => void
  setLanguage: (newValue: LanguageType) => void
  setTheme: (newValue: ThemeType) => void
  resetAppSettings: () => void
}
