import { FontType, TextAlignType } from "../../types/typingSettings.types"

import {
  SET_SELECTED_FONT,
  SET_AMOUNT_OF_SHOWN_LINES,
  SET_ALIGN_TEXT,
  SET_FONT_SIZE,
  SET_LINE_SPACING,
  SET_LETTER_SPACING,
} from "../actions/typingSettingsActions"
import { TypingSettingsInterface } from "../../types/typingSettings.types"

export type TypingSettingsActions =
  | { type: typeof SET_SELECTED_FONT; payload: FontType }
  | { type: typeof SET_AMOUNT_OF_SHOWN_LINES; payload: number }
  | { type: typeof SET_ALIGN_TEXT; payload: TextAlignType }
  | { type: typeof SET_FONT_SIZE; payload: number }
  | { type: typeof SET_LINE_SPACING; payload: number }
  | { type: typeof SET_LETTER_SPACING; payload: number }

const typingSettingsReducer = (state: TypingSettingsInterface, action: TypingSettingsActions) => {
  switch (action.type) {
    case SET_SELECTED_FONT:
      return { ...state, selectedFont: action.payload }
    case SET_AMOUNT_OF_SHOWN_LINES:
      return { ...state, amountOfShownLines: action.payload }
    case SET_ALIGN_TEXT:
      return { ...state, alignText: action.payload }
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    case SET_LINE_SPACING:
      return { ...state, lineSpacing: action.payload }
    case SET_LETTER_SPACING:
      return { ...state, letterSpacing: action.payload }
    default:
      return state
  }
}

export default typingSettingsReducer
