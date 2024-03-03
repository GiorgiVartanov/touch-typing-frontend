import { FontType, FontSizeType, TypingSettingsState } from "../../types/typingSettings.types"

const font: FontType | null = localStorage.getItem("font") as FontType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType

export const defaultFont = "sans"
export const defaultFontSize = "medium"

export const typingSettingsInitialState: TypingSettingsState = {
  font: font || defaultFont,
  fontSize: fontSize || defaultFontSize,
}
