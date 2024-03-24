import {
  TypingLanguageType,
  FontType,
  FontSizeType,
} from "../../types/typer.types/typingSettings.types"

export const SET_TYPING_LANGUAGE = "SET_TYPING_LANGUAGE"
export const SET_FONT = "SET_FONT"
export const SET_FONT_SIZE = "SET_FONT_SIZE"

export const setTypingLanguageAction = (
  typingLanguage: TypingLanguageType
): { type: typeof SET_TYPING_LANGUAGE; payload: TypingLanguageType } => ({
  type: SET_TYPING_LANGUAGE,
  payload: typingLanguage,
})

export const setFontAction = (font: FontType): { type: typeof SET_FONT; payload: FontType } => ({
  type: SET_FONT,
  payload: font,
})

export const setFontSizeAction = (
  size: FontSizeType
): { type: typeof SET_FONT_SIZE; payload: FontSizeType } => ({
  type: SET_FONT_SIZE,
  payload: size,
})
