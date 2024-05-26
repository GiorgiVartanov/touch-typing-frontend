import { KeyboardLayoutInterface } from "../keyboard.types"

export type KeyboardLanguageType = "Geo" | "Eng"
export interface savedKeyboardLayoutInterface {
  Eng: KeyboardLayoutInterface
  Geo: KeyboardLayoutInterface
}
export type KeyboardTypeType = "ANSI" | "ANSI-ISO" | "ISO"
export type KeyboardSizeType = "small" | "medium" | "large"
export type FontType = "sans" | "serif" | "sanet"
export type FontSizeType = "small" | "medium" | "large" | "extra large"

export interface TypingSettingsState {
  keyboardLanguage: KeyboardLanguageType
  keyboardLayout: savedKeyboardLayoutInterface
  keyboardType: KeyboardTypeType
  keyboardSize: KeyboardSizeType
  showColoredKeys: boolean
  showKeyboardWhileTyping: boolean
  font: FontType
  fontSize: FontSizeType
}

export interface TypingSettingsOptions {
  keyboardLanguageOptions: KeyboardLanguageType[]
  keyboardTypeOptions: KeyboardTypeType[]
  fontOptions: FontType[]
  fontSizeOptions: FontSizeType[]
  keyboardSizeOptions: KeyboardSizeType[]
}

export interface TypingSettingItem {
  message: string
  values: string[] | number[]
  selectedValue: string | number
  changeSetting: (value: string | number) => void
}

export interface TypingSettingsActions {
  setKeyboardLanguage: (newValue: KeyboardLanguageType) => void
  setKeyboardLayout: (newValue: savedKeyboardLayoutInterface) => void
  setKeyboardType: (newValue: KeyboardTypeType) => void
  setKeyboardSize: (newValue: KeyboardSizeType) => void
  setShowColoredKeys: (newValue: boolean) => void
  setShowKeyboardWhileTyping: (newValue: boolean) => void
  setFont: (newValue: FontType) => void
  setFontSize: (newValue: FontSizeType) => void
  resetTypingSettings: () => void
}
