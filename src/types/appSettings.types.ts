export type LanguageType = "Eng" | "Geo"
export type ThemeType = "System Default" | "Dark" | "Light"

export interface AppSettingsState {
  language: LanguageType
  theme: ThemeType
}

export interface AppSettingsActions {
  setAppSettings: (appSettings: AppSettingsState) => void
  setLanguage: (newValue: LanguageType) => void
  setTheme: (newValue: ThemeType) => void
  resetAppSettings: () => void
}
