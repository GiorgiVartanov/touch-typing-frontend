import {
  KeyboardLanguageType,
  savedKeyboardLayoutInterface,
  KeyboardTypeType,
  KeyboardSizeType,
  FontType,
  FontSizeType,
  TypingSettingsState,
} from "../../types/typer.types/typingSettings.types"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"

import qwertyLayout from "../../keyboardLayouts/qwerty.json"
import qwertyGeorgianLayout from "../../keyboardLayouts/geo2.json"

const KeyboardLanguage: KeyboardLanguageType | null = localStorage.getItem(
  "keyboardLanguage"
) as KeyboardLanguageType
const keyboardType: KeyboardTypeType | null = localStorage.getItem(
  "keyboardType"
) as KeyboardTypeType
const keyboardSize: KeyboardSizeType | null = localStorage.getItem(
  "keyboardSize"
) as KeyboardSizeType
const showColoredKeys = localStorage.getItem("showColoredKeys") === "true"
const showKeyboardWhileTyping = localStorage.getItem("showKeyboardWhileTyping") === "true"
const font: FontType | null = localStorage.getItem("font") as FontType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType

let keyboardLayout: savedKeyboardLayoutInterface | null = null

const storedLayout = localStorage.getItem("keyboardLayout")

console.log({ showKeyboardWhileTyping })

// if (storedLayout) {
//   try {
//     keyboardLayout = JSON.parse(storedLayout) as savedKeyboardLayoutInterface
//   } catch (e: any) {
//     keyboardLayout = null
//   }
// }

const qwertyKeyboardLayout: KeyboardLayoutInterface = qwertyLayout as KeyboardLayoutInterface
const qwertyGeorgianKeyboardLayout: KeyboardLayoutInterface =
  qwertyGeorgianLayout as KeyboardLayoutInterface

export const defaultKeyboardLayout: savedKeyboardLayoutInterface = {
  Eng: qwertyKeyboardLayout,
  Geo: qwertyGeorgianKeyboardLayout,
}

export const defaultKeyboardLanguage = "Geo"
export const defaultKeyboardType = "ANSI"
export const defaultKeyboardSize = "medium"
export const defaultShowColoredKeys = true
export const defaultShowKeyboardWhileTyping = true
export const defaultFont = "sans"
export const defaultFontSize = "medium"

export const typingSettingsInitialState: TypingSettingsState = {
  keyboardLanguage: KeyboardLanguage || defaultKeyboardLanguage,
  keyboardLayout: keyboardLayout || defaultKeyboardLayout,
  keyboardType: keyboardType || defaultKeyboardType,
  keyboardSize: keyboardSize || defaultKeyboardSize,
  showColoredKeys: showColoredKeys !== undefined || defaultShowColoredKeys,
  showKeyboardWhileTyping: showKeyboardWhileTyping,
  font: font || defaultFont,
  fontSize: fontSize || defaultFontSize,
}
