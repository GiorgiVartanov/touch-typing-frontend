import {
  FontType,
  AmountOfShownLinesType,
  AlignTextType,
  FontSizeType,
  LineHeightType,
  LetterSpacingType,
} from "../../types/typingSettings.types"

export const SET_SELECTED_FONT = "SET_SELECTED_FONT"
export const SET_AMOUNT_OF_SHOWN_LINES = "SET_AMOUNT_OF_SHOWN_LINES"
export const SET_ALIGN_TEXT = "SET_ALIGN_TEXT"
export const SET_FONT_SIZE = "SET_FONT_SIZE"
export const SET_LINE_HEIGHT = "SET_LINE_HEIGHT"
export const SET_LETTER_SPACING = "SET_LETTER_SPACING"

export const setSelectedFont = (
  font: FontType
): { type: typeof SET_SELECTED_FONT; payload: FontType } => ({
  type: SET_SELECTED_FONT,
  payload: font,
})

export const setAmountOfShownLines = (
  amount: AmountOfShownLinesType
): { type: typeof SET_AMOUNT_OF_SHOWN_LINES; payload: AmountOfShownLinesType } => ({
  type: SET_AMOUNT_OF_SHOWN_LINES,
  payload: amount,
})

export const setAlignText = (
  textAlignment: AlignTextType
): { type: typeof SET_ALIGN_TEXT; payload: AlignTextType } => ({
  type: SET_ALIGN_TEXT,
  payload: textAlignment,
})

export const setFontSize = (
  size: FontSizeType
): { type: typeof SET_FONT_SIZE; payload: FontSizeType } => ({
  type: SET_FONT_SIZE,
  payload: size,
})

export const setLineHeight = (
  spacing: LineHeightType
): { type: typeof SET_LINE_HEIGHT; payload: LineHeightType } => ({
  type: SET_LINE_HEIGHT,
  payload: spacing,
})

export const setLetterSpacing = (
  spacing: LetterSpacingType
): { type: typeof SET_LETTER_SPACING; payload: LetterSpacingType } => ({
  type: SET_LETTER_SPACING,
  payload: spacing,
})
