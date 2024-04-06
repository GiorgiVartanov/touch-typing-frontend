export type KeyboardLayoutType =
  | "QWERTY"
  | "QWERTY georgian"
  | "Dvorak"
  | "Colemak"
  | "Workman"
  | "Custom"
export type KeyboardTypeType = "ANSI" | "ANSI-ISO" | "ISO" | "ABNT" | "KS" | "JIS"
export type FontType = "sans" | "serif" | "sanet"
export type FontSizeType = "small" | "medium" | "large" | "extra large"

export interface TypingSettingsState {
  keyboardLayout: KeyboardLayoutType
  keyboardType: KeyboardTypeType
  font: FontType
  fontSize: FontSizeType
}

export interface TypingSettingsOptions {
  keyboardLayoutOptions: KeyboardLayoutType[]
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
  setKeyboardLayout: (newValue: KeyboardLayoutType) => void
  setKeyboardType: (newValue: KeyboardTypeType) => void
  setFont: (newValue: FontType) => void
  setFontSize: (newValue: FontSizeType) => void
  resetTypingSettings: () => void
}
