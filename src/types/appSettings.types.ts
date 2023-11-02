export type PreferredLanguageType = "Eng" | "Geo"
export type ThemeType = "System Default" | "Dark" | "Light"
export type LayoutType = "QWERTY"
export type PreferredTypingLanguageType = "Eng" | "Geo"

export interface AppSettingsInterface {
  preferredLanguage: PreferredLanguageType
  preferredTheme: ThemeType
  isProfilePublic: boolean
  favoriteLayout: LayoutType
  preferredTypingLanguage: PreferredTypingLanguageType
}
