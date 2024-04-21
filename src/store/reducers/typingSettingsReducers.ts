import {
  KeyboardLanguageType,
  KeyboardTypeType,
  savedKeyboardLayoutInterface,
  FontType,
  FontSizeType,
} from "../../types/typer.types/typingSettings.types"

import {
  SET_FONT,
  SET_FONT_SIZE,
  SET_KEYBOARD_LAYOUT,
  SET_KEYBOARD_TYPE,
  SET_KEYBOARD_LANGUAGE,
} from "../actions/typingSettingsActions"
import { TypingSettingsState } from "../../types/typer.types/typingSettings.types"

export type TypingSettingsActions =
  | { type: typeof SET_KEYBOARD_LANGUAGE; payload: KeyboardLanguageType }
  | { type: typeof SET_KEYBOARD_LAYOUT; payload: savedKeyboardLayoutInterface }
  | { type: typeof SET_KEYBOARD_TYPE; payload: KeyboardTypeType }
  | { type: typeof SET_FONT; payload: FontType }
  | { type: typeof SET_FONT_SIZE; payload: FontSizeType }

const typingSettingsReducer = (state: TypingSettingsState, action: TypingSettingsActions) => {
  switch (action.type) {
    case SET_KEYBOARD_LANGUAGE:
      return { ...state, keyboardLanguage: action.payload }
    case SET_KEYBOARD_LAYOUT:
      return { ...state, keyboardLayout: action.payload }
    case SET_KEYBOARD_TYPE:
      return { ...state, keyboardType: action.payload }
    case SET_FONT:
      return { ...state, font: action.payload }
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    default:
      return state
  }
}

export default typingSettingsReducer
