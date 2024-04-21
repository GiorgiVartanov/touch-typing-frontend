import {
  KeyboardLanguageType,
  savedKeyboardLayoutInterface,
  KeyboardTypeType,
  FontType,
  FontSizeType,
} from "../../types/typer.types/typingSettings.types"

export const SET_KEYBOARD_LANGUAGE = "SEY_KEYBOARD_LANGUAGE"
export const SET_KEYBOARD_LAYOUT = "SET_KEYBOARD_LAYOUT"
export const SET_KEYBOARD_TYPE = "SET_KEYBOARD_TYPE"
export const SET_FONT = "SET_FONT"
export const SET_FONT_SIZE = "SET_FONT_SIZE"

export const setKeyboardLanguageAction = (
  keyboardLanguage: KeyboardLanguageType
): { type: typeof SET_KEYBOARD_LANGUAGE; payload: KeyboardLanguageType } => ({
  type: SET_KEYBOARD_LANGUAGE,
  payload: keyboardLanguage,
})

export const setKeyboardLayoutAction = (
  keyboardLayout: savedKeyboardLayoutInterface
): { type: typeof SET_KEYBOARD_LAYOUT; payload: savedKeyboardLayoutInterface } => ({
  type: SET_KEYBOARD_LAYOUT,
  payload: keyboardLayout,
})

export const setKeyboardTypeAction = (
  keyboardType: KeyboardTypeType
): { type: typeof SET_KEYBOARD_TYPE; payload: KeyboardTypeType } => ({
  type: SET_KEYBOARD_TYPE,
  payload: keyboardType,
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
