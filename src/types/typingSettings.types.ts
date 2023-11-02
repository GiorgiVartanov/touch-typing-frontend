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

export interface TypingSettingsInterface {
  selectedFont: FontType
  amountOfShownLines: AmountOfShownLinesType
  alignText: AlignTextType
  fontSize: FontSizeType
  lineHeight: LineHeightType
  letterSpacing: LetterSpacingType
}

export interface TypingSettingItemInterface {
  message: string
  field: string
  values: string[] | number[]
  selectedValue: string | number
  changeSetting: (settingName: string, value: string | number) => void
}
