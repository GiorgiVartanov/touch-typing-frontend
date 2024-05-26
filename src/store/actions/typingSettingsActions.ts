import {
  KeyboardLanguageType,
  savedKeyboardLayoutInterface,
  KeyboardTypeType,
  KeyboardSizeType,
  FontType,
  FontSizeType,
} from "../../types/typer.types/typingSettings.types"

export const SET_KEYBOARD_LANGUAGE = "SEY_KEYBOARD_LANGUAGE"
export const SET_KEYBOARD_LAYOUT = "SET_KEYBOARD_LAYOUT"
export const SET_KEYBOARD_TYPE = "SET_KEYBOARD_TYPE"
export const SET_KEYBOARD_SIZE = "SET_KEYBOARD_SIZE"
export const SET_SHOW_COLORED_KEYS = "SET_SHOW_COLORED_KEYS "
export const SET_SHOW_KEYBOARD_WHILE_TYPING = "SET_SHOW_KEYBOARD_WHILE_TYPING "
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

export const setKeyboardSizeAction = (
  keyboardSize: KeyboardSizeType
): {
  type: typeof SET_KEYBOARD_SIZE
  payload: KeyboardSizeType
} => ({
  type: SET_KEYBOARD_SIZE,
  payload: keyboardSize,
})

export const setShowColoredKeysAction = (
  showColoredKeys: boolean
): {
  type: typeof SET_SHOW_COLORED_KEYS
  payload: boolean
} => ({
  type: SET_SHOW_COLORED_KEYS,
  payload: showColoredKeys,
})

export const setShowKeyboardWhileTypingAction = (
  showKeyboardWhileTyping: boolean
): {
  type: typeof SET_SHOW_KEYBOARD_WHILE_TYPING
  payload: boolean
} => ({
  type: SET_SHOW_KEYBOARD_WHILE_TYPING,
  payload: showKeyboardWhileTyping,
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
