import {
  FontType,
  AmountOfShownLinesType,
  AlignTextType,
  FontSizeType,
  LineHeightType,
  LetterSpacingType,
  TypingSettingsState,
} from "../../types/typingSettings.types"

const font: FontType | null = localStorage.getItem("font") as FontType
const amountOfShownLines: AmountOfShownLinesType | null = localStorage.getItem(
  "amountOfShownLines"
) as AmountOfShownLinesType
const alignText: AlignTextType | null = localStorage.getItem("alignText") as AlignTextType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType
const lineHeight: LineHeightType | null = localStorage.getItem("lineHeight") as LineHeightType
const letterSpacing: LetterSpacingType | null = localStorage.getItem(
  "letterSpacing"
) as LetterSpacingType

export const defaultFont = "sans"
export const defaultAmountOfShownLines = "5"
export const defaultAlignText = "left"
export const defaultFontSize = "Auto"
export const defaultLineHeight = "Auto"
export const defaultLetterSpacing = "0"

export const typingSettingsInitialState: TypingSettingsState = {
  font: font || defaultFont,
  amountOfShownLines: amountOfShownLines || defaultAmountOfShownLines,
  alignText: alignText || defaultAlignText,
  fontSize: fontSize || defaultFontSize,
  lineHeight: lineHeight || defaultLineHeight,
  letterSpacing: letterSpacing || defaultLetterSpacing,
}
