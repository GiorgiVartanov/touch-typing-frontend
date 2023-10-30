import { FontType, TextAlignType } from "../../types/typingSettings.types"

export const SET_SELECTED_FONT = "SET_SELECTED_FONT"
export const SET_AMOUNT_OF_SHOWN_LINES = "SET_AMOUNT_OF_SHOWN_LINES"
export const SET_ALIGN_TEXT = "SET_ALIGN_TEXT"
export const SET_FONT_SIZE = "SET_FONT_SIZE"
export const SET_LINE_SPACING = "SET_LINE_SPACING"
export const SET_LETTER_SPACING = "SET_LETTER_SPACING"

export const setSelectedFont = (
  font: FontType
): { type: typeof SET_SELECTED_FONT; payload: FontType } => ({
  type: SET_SELECTED_FONT,
  payload: font,
})

export const setAmountOfShownLines = (
  amount: number
): { type: typeof SET_AMOUNT_OF_SHOWN_LINES; payload: number } => ({
  type: SET_AMOUNT_OF_SHOWN_LINES,
  payload: amount,
})

export const setAlignText = (
  textAlignment: TextAlignType
): { type: typeof SET_ALIGN_TEXT; payload: TextAlignType } => ({
  type: SET_ALIGN_TEXT,
  payload: textAlignment,
})

export const setFontSize = (size: number): { type: typeof SET_FONT_SIZE; payload: number } => ({
  type: SET_FONT_SIZE,
  payload: size,
})

export const setLineSpacing = (
  spacing: number
): { type: typeof SET_LINE_SPACING; payload: number } => ({
  type: SET_LINE_SPACING,
  payload: spacing,
})

export const setLetterSpacing = (
  spacing: number
): { type: typeof SET_LETTER_SPACING; payload: number } => ({
  type: SET_LETTER_SPACING,
  payload: spacing,
})
