import { LanguageType, ThemeType } from "../../types/appSettings.types"

export const SET_THEME = "SET_THEME"
export const SET_LANGUAGE = "SET_LANGUAGE"

export const setThemeAction = (
  theme: ThemeType
): { type: typeof SET_THEME; payload: ThemeType } => ({
  type: SET_THEME,
  payload: theme,
})

export const setLanguageAction = (
  language: LanguageType
): { type: typeof SET_LANGUAGE; payload: LanguageType } => ({
  type: SET_LANGUAGE,
  payload: language,
})
