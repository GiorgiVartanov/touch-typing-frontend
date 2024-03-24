export type TypingLanguageType = "QWERTY" | "QWERTY georgian" | "Dvorak" | "Colemak" | "Workman"
export type FontType = "sans" | "serif" | "sanet"
export type FontSizeType = "small" | "medium" | "large" | "extra large"

export interface TypingSettingsState {
  typingLanguage: TypingLanguageType
  font: FontType
  fontSize: FontSizeType
}

export interface TypingSettingsOptions {
  typingLanguageOptions: TypingLanguageType[]
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
  setTypingLanguage: (newValue: TypingLanguageType) => void
  setFont: (newValue: FontType) => void
  setFontSize: (newValue: FontSizeType) => void
  resetTypingSettings: () => void
}
