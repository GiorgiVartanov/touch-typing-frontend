import { Reducer } from "react"

import {
  PreferredLanguageType,
  ThemeType,
  LayoutType,
  PreferredTypingLanguageType,
  AppSettingsInterface,
} from "../../types/appSettings.types"
import {
  SET_PREFERRED_THEME,
  SET_PREFERRED_LANGUAGE,
  SET_PROFILE_VISIBILITY,
  SET_FAVORITE_LAYOUT,
  SET_PREFERRED_TYPING_LANGUAGE,
} from "../actions/appSettingsActions"

export type AppSettingsActions =
  | { type: typeof SET_PREFERRED_THEME; payload: ThemeType }
  | { type: typeof SET_PREFERRED_LANGUAGE; payload: PreferredLanguageType }
  | { type: typeof SET_PROFILE_VISIBILITY; payload: boolean }
  | { type: typeof SET_FAVORITE_LAYOUT; payload: LayoutType }
  | { type: typeof SET_PREFERRED_TYPING_LANGUAGE; payload: PreferredTypingLanguageType }

const appSettingsReducer: Reducer<AppSettingsInterface, AppSettingsActions> = (
  state: AppSettingsInterface,
  action: AppSettingsActions
) => {
  switch (action.type) {
    case SET_PREFERRED_THEME:
      return { ...state, preferredTheme: action.payload }
    case SET_PREFERRED_LANGUAGE:
      return { ...state, preferredLanguage: action.payload }
    case SET_PROFILE_VISIBILITY:
      return { ...state, isProfilePublic: action.payload }
    case SET_FAVORITE_LAYOUT:
      return { ...state, favoriteLayout: action.payload }
    case SET_PREFERRED_TYPING_LANGUAGE:
      return { ...state, preferredTypingLanguage: action.payload }
    default:
      return state
  }
}

export default appSettingsReducer
