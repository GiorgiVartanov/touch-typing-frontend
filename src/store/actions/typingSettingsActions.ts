import { FontType, FontSizeType } from "../../types/typer.types/typingSettings.types"

export const SET_FONT = "SET_FONT"
export const SET_FONT_SIZE = "SET_FONT_SIZE"

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
