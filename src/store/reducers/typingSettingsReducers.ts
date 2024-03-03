import { FontType, FontSizeType } from "../../types/typingSettings.types"

import { SET_FONT, SET_FONT_SIZE } from "../actions/typingSettingsActions"
import { TypingSettingsState } from "../../types/typingSettings.types"

export type TypingSettingsActions =
  | { type: typeof SET_FONT; payload: FontType }
  | { type: typeof SET_FONT_SIZE; payload: FontSizeType }

const typingSettingsReducer = (state: TypingSettingsState, action: TypingSettingsActions) => {
  switch (action.type) {
    case SET_FONT:
      return { ...state, font: action.payload }
    case SET_FONT_SIZE:
      return { ...state, fontSize: action.payload }
    default:
      return state
  }
}

export default typingSettingsReducer
