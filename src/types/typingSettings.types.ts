export type FontType = "sans" | "serif" | "cursive" | "sanet"

export type FontSizeType = "small" | "medium" | "large" | "extra large"

export interface TypingSettingsOptions {
  fontOptions: FontType[]
  fontSizeOptions: FontSizeType[]
}

export interface TypingSettingsState {
  font: FontType
  fontSize: FontSizeType
}

export interface TypingSettingItem {
  message: string
  values: string[] | number[]
  selectedValue: string | number
  changeSetting: (value: string | number) => void
}

export interface TypingSettingsActions {
  setFont: (newValue: FontType) => void
  setFontSize: (newValue: FontSizeType) => void
  resetTypingSettings: () => void
}
