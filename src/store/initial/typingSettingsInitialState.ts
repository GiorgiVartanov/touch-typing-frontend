import {
  TypingLanguageType,
  FontType,
  FontSizeType,
  TypingSettingsState,
} from "../../types/typer.types/typingSettings.types"

const typingLanguage: TypingLanguageType | null = localStorage.getItem(
  "typingLanguage"
) as TypingLanguageType
const font: FontType | null = localStorage.getItem("font") as FontType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType

export const defaultTypingLanguage = "QWERTY"
export const defaultFont = "sans"
export const defaultFontSize = "medium"

export const typingSettingsInitialState: TypingSettingsState = {
  typingLanguage: typingLanguage || defaultTypingLanguage,
  font: font || defaultFont,
  fontSize: fontSize || defaultFontSize,
}
