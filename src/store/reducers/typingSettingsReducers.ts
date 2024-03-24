import {
  TypingLanguageType,
  FontType,
  FontSizeType,
} from "../../types/typer.types/typingSettings.types"

import { SET_FONT, SET_FONT_SIZE, SET_TYPING_LANGUAGE } from "../actions/typingSettingsActions"
import { TypingSettingsState } from "../../types/typer.types/typingSettings.types"

export type TypingSettingsActions =
  | { type: typeof SET_TYPING_LANGUAGE; payload: TypingLanguageType }
  | { type: typeof SET_FONT; payload: FontType }
  | { type: typeof SET_FONT_SIZE; payload: FontSizeType }

const typingSettingsReducer = (state: TypingSettingsState, action: TypingSettingsActions) => {
  switch (action.type) {
    case SET_TYPING_LANGUAGE:
      return { ...state, typingLanguage: action.payload }
    case SET_FONT:
      return { ...state, font: action.payload }
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    default:
      return state
  }
}

export default typingSettingsReducer
