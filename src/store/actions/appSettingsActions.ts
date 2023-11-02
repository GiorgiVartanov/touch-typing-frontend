import {
  PreferredLanguageType,
  ThemeType,
  LayoutType,
  PreferredTypingLanguageType,
} from "../../types/appSettings.types"

export const SET_PREFERRED_THEME = "SET_PREFERRED_THEME"
export const SET_PREFERRED_LANGUAGE = "SET_PREFERRED_LANGUAGE"
export const SET_PROFILE_VISIBILITY = "SET_PROFILE_VISIBILITY"
export const SET_FAVORITE_LAYOUT = "SET_FAVORITE_LAYOUT"
export const SET_PREFERRED_TYPING_LANGUAGE = "SET_PREFERRED_TYPING_LANGUAGE"

export const setPreferredTheme = (
  theme: ThemeType
): { type: typeof SET_PREFERRED_THEME; payload: ThemeType } => ({
  type: SET_PREFERRED_THEME,
  payload: theme,
})

export const setPreferredLanguage = (
  language: PreferredLanguageType
): { type: typeof SET_PREFERRED_LANGUAGE; payload: PreferredLanguageType } => ({
  type: SET_PREFERRED_LANGUAGE,
  payload: language,
})

export const setProfileVisibility = (
  isVisible: boolean
): { type: typeof SET_PROFILE_VISIBILITY; payload: boolean } => ({
  type: SET_PROFILE_VISIBILITY,
  payload: isVisible,
})

export const setFavoriteLayout = (
  layout: LayoutType
): { type: typeof SET_FAVORITE_LAYOUT; payload: LayoutType } => ({
  type: SET_FAVORITE_LAYOUT,
  payload: layout,
})

export const setPreferredTypingLanguage = (
  language: PreferredTypingLanguageType
): { type: typeof SET_PREFERRED_TYPING_LANGUAGE; payload: PreferredTypingLanguageType } => ({
  type: SET_PREFERRED_TYPING_LANGUAGE,
  payload: language,
})
