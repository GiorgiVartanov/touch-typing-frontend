export type FontType = "sans" | "serif"

export type TextAlignType = "Left" | "Center" | "Right"

export interface TypingSettingsOptionsInterface {
  fontOptions: string[]
  amountOfShownLinesOptions: number[]
  alignTextOptions: string[]
  fontSizeOptions: number[]
  lineSpacingOptions: number[]
  letterSpacingOptions: number[]
}

export interface TypingSettingsInterface {
  selectedFont: FontType
  amountOfShownLines: number
  alignText: TextAlignType
  fontSize: number
  lineSpacing: number
  letterSpacing: number
}
