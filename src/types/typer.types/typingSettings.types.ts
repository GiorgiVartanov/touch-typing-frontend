import { KeyboardLayoutInterface } from "../keyboard.types"

export type KeyboardLanguageType = "Geo" | "Eng"
export interface savedKeyboardLayoutInterface {
  Eng: KeyboardLayoutInterface
  Geo: KeyboardLayoutInterface
}
export type KeyboardTypeType = "ANSI" | "ANSI-ISO" | "ISO"
export type FontType = "sans" | "serif" | "sanet"
export type FontSizeType = "small" | "medium" | "large" | "extra large"

export interface TypingSettingsState {
  keyboardLanguage: KeyboardLanguageType
  keyboardLayout: savedKeyboardLayoutInterface
  keyboardType: KeyboardTypeType
  font: FontType
  fontSize: FontSizeType
}

export interface TypingSettingsOptions {
  keyboardLanguageOptions: KeyboardLanguageType[]
  keyboardTypeOptions: KeyboardTypeType[]
  fontOptions: FontType[]
  fontSizeOptions: FontSizeType[]
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
  setFont: (newValue: FontType) => void
  setFontSize: (newValue: FontSizeType) => void
  resetTypingSettings: () => void
}
