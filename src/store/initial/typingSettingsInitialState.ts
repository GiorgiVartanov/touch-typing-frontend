import {
  KeyboardLayoutType,
  KeyboardTypeType,
  FontType,
  FontSizeType,
  TypingSettingsState,
} from "../../types/typer.types/typingSettings.types"

const keyboardLayout: KeyboardLayoutType | null = localStorage.getItem(
  "keyboardLayout"
) as KeyboardLayoutType
const keyboardType: KeyboardTypeType | null = localStorage.getItem(
  "keyboardType"
) as KeyboardTypeType
const font: FontType | null = localStorage.getItem("font") as FontType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType

export const defaultKeyboardLayout = "QWERTY"
export const defaultKeyboardType = "ANSI"
export const defaultFont = "sans"
export const defaultFontSize = "medium"

export const typingSettingsInitialState: TypingSettingsState = {
  keyboardLayout: keyboardLayout || defaultKeyboardLayout,
  keyboardType: keyboardType || defaultKeyboardType,
  font: font || defaultFont,
  fontSize: fontSize || defaultFontSize,
}
