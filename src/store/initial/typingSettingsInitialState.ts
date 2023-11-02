import {
  FontType,
  AmountOfShownLinesType,
  AlignTextType,
  FontSizeType,
  LineHeightType,
  LetterSpacingType,
  TypingSettingsInterface,
} from "../../types/typingSettings.types"

const selectedFont: FontType | null = localStorage.getItem("selectedFont") as FontType
const amountOfShownLines: AmountOfShownLinesType | null = localStorage.getItem(
  "amountOfShownLines"
) as AmountOfShownLinesType
const alignText: AlignTextType | null = localStorage.getItem("alignText") as AlignTextType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType
const lineHeight: LineHeightType | null = localStorage.getItem("lineHeight") as LineHeightType
const letterSpacing: LetterSpacingType | null = localStorage.getItem(
  "letterSpacing"
) as LetterSpacingType

export interface TyperFunctions {
  setFetchedSettings: (settings: TypingSettingsInterface) => void
  changeSetting: (settingName: string, value: string | number) => void
}

export const typingSettingsInitialState: TypingSettingsInterface = {
  selectedFont: selectedFont || "sans",
  amountOfShownLines: amountOfShownLines || "5",
  alignText: alignText || "Left",
  fontSize: fontSize || "Auto",
  lineHeight: lineHeight || "Auto",
  letterSpacing: letterSpacing || "0",
}
