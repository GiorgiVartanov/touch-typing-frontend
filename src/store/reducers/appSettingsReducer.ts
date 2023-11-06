import { Reducer } from "react"

import { LanguageType, ThemeType, AppSettingsState } from "../../types/appSettings.types"
import { SET_THEME, SET_LANGUAGE } from "../actions/appSettingsActions"

export type AppSettingsActions =
  | { type: typeof SET_THEME; payload: ThemeType }
  | { type: typeof SET_LANGUAGE; payload: LanguageType }

const appSettingsReducer: Reducer<AppSettingsState, AppSettingsActions> = (
  state: AppSettingsState,
  action: AppSettingsActions
) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload }
    case SET_LANGUAGE:
      return { ...state, language: action.payload }
    default:
      return state
  }
}

export default appSettingsReducer
