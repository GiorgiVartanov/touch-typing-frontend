import {
  ThemeType,
  PreferredLanguageType,
  LayoutType,
  AppSettingsInterface,
  PreferredTypingLanguageType,
} from "../../types/appSettings.types"

const preferredTheme: ThemeType | null = localStorage.getItem("preferredTheme") as ThemeType
const preferredLanguage: PreferredLanguageType | null = localStorage.getItem(
  "preferredLanguage"
) as PreferredLanguageType
const isProfilePublic: boolean = localStorage.getItem("isProfilePublic") === "true"
const favoriteLayout: LayoutType =
  (localStorage.getItem("favoriteLayout") as LayoutType) || "QWERTY"
const preferredTypingLanguage: PreferredTypingLanguageType | null = localStorage.getItem(
  "preferredTypingLanguage"
) as PreferredTypingLanguageType

export const appSettingsInitialState: AppSettingsInterface = {
  preferredTheme: preferredTheme || "System Default",
  preferredLanguage: preferredLanguage || "Geo",
  isProfilePublic: isProfilePublic || true,
  favoriteLayout: favoriteLayout || "QWERTY",
  preferredTypingLanguage: preferredTypingLanguage || "Geo",
}
