import { FontType, TypingSettingsInterface } from "../../types/typingSettings.types"

const selectedFont: FontType | null = localStorage.getItem("selectedFont") as FontType
const amountOfShownLines: number | null = Number(localStorage.getItem("amountOfShownLines"))
const alignText: "Left" | "Center" | "Right" | null = localStorage.getItem("alignText") as
  | "Left"
  | "Center"
  | "Right"
const fontSize: number | null = Number(localStorage.getItem("fontSize"))
const lineSpacing: number | null = Number(localStorage.getItem("lineSpacing"))
const letterSpacing: number | null = Number(localStorage.getItem("letterSpacing"))

// export interface TyperState {
//   selectedFont: FontType
//   amountOfShownLines: number
//   alignText: "Left" | "Center" | "Right"
//   fontSize: number
//   lineSpacing: number
//   letterSpacing: number
// }

export interface TyperFunctions {
  setFetchedSettings: (settings: TypingSettingsInterface) => void
  changeSetting: (settingName: string, value: string | number) => void
  // selectFont: (font: FontType) => void
  // selectAmountOfShownLines: (amount: number) => void
  // selectTextAlignment: (newAlignment: "Left" | "Center" | "Right") => void
  // selectFontSize: (size: number) => void
  // selectLineSpacing: (spacing: number) => void
  // selectLetterSpacing: (spacing: number) => void
}

export const initialState: TypingSettingsInterface = {
  selectedFont: selectedFont || "sans",
  amountOfShownLines: amountOfShownLines || 4,
  alignText: alignText || "Left",
  fontSize: fontSize || 1.25,
  lineSpacing: lineSpacing || 1.75,
  letterSpacing: letterSpacing || 0,
}
