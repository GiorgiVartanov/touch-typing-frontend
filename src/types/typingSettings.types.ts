export type FontType = "sans" | "serif"
export type AmountOfShownLinesType = "3" | "4" | "5" | "6" | "7"
export type AlignTextType = "left" | "center" | "right"
export type FontSizeType =
  | "Auto"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "18"
  | "24"
  | "30"
  | "36"
export type LineHeightType =
  | "Auto"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "18"
  | "24"
  | "30"
  | "36"
export type LetterSpacingType = "0" | "1" | "2" | "3" | "4" | "5" | "6"

export interface TypingSettingsOptionsInterface {
  fontOptions: FontType[]
  amountOfShownLinesOptions: AmountOfShownLinesType[]
  alignTextOptions: AlignTextType[]
  fontSizeOptions: FontSizeType[]
  lineHeightOptions: LineHeightType[]
  letterSpacingOptions: LetterSpacingType[]
}

export interface TypingSettingsState {
  font: FontType
  amountOfShownLines: AmountOfShownLinesType
  alignText: AlignTextType
  fontSize: FontSizeType
  lineHeight: LineHeightType
  letterSpacing: LetterSpacingType
}

export interface TypingSettingItemInterface {
  message: string
  values: string[] | number[]
  selectedValue: string | number
  changeSetting: (value: string | number) => void
}

export interface TypingSettingsActions {
  setTypingSettings: (settings: TypingSettingsState) => void
  setFont: (newValue: FontType) => void
  setAmountOfShownLines: (newValue: AmountOfShownLinesType) => void
  setAlignText: (newValue: AlignTextType) => void
  setFontSize: (newValue: FontSizeType) => void
  setLineHeight: (newValue: LineHeightType) => void
  setLetterSpacing: (newValue: LetterSpacingType) => void
  resetTypingSettings: () => void
}
