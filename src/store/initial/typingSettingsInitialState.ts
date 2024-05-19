import {
  KeyboardLanguageType,
  savedKeyboardLayoutInterface,
  KeyboardTypeType,
  FontType,
  FontSizeType,
  TypingSettingsState,
} from "../../types/typer.types/typingSettings.types"
import { KeyboardLayoutInterface } from "../../types/keyboard.types"

import qwertyLayout from "../../keyboardLayouts/qwerty.json"
import qwertyGeorgianLayout from "../../keyboardLayouts/geo.json"

const KeyboardLanguage: KeyboardLanguageType | null = localStorage.getItem(
  "keyboardLanguage"
) as KeyboardLanguageType
const keyboardType: KeyboardTypeType | null = localStorage.getItem(
  "keyboardType"
) as KeyboardTypeType
const font: FontType | null = localStorage.getItem("font") as FontType
const fontSize: FontSizeType | null = localStorage.getItem("fontSize") as FontSizeType

let keyboardLayout: savedKeyboardLayoutInterface | null = null

const storedLayout = localStorage.getItem("keyboardLayout")

if (storedLayout) {
  try {
    keyboardLayout = JSON.parse(storedLayout) as savedKeyboardLayoutInterface
  } catch (e: any) {
    keyboardLayout = null
  }
}

const qwertyKeyboardLayout: KeyboardLayoutInterface = qwertyLayout as KeyboardLayoutInterface
const qwertyGeorgianKeyboardLayout: KeyboardLayoutInterface =
  qwertyGeorgianLayout as KeyboardLayoutInterface

export const defaultKeyboardLayout: savedKeyboardLayoutInterface = {
  Eng: qwertyKeyboardLayout,
  Geo: qwertyGeorgianKeyboardLayout,
}

export const defaultKeyboardLanguage = "Eng"
export const defaultKeyboardType = "ANSI"
export const defaultFont = "sans"
export const defaultFontSize = "medium"

export const typingSettingsInitialState: TypingSettingsState = {
  keyboardLanguage: KeyboardLanguage || defaultKeyboardLanguage,
  keyboardLayout: keyboardLayout || defaultKeyboardLayout,
  keyboardType: keyboardType || defaultKeyboardType,
  font: font || defaultFont,
  fontSize: fontSize || defaultFontSize,
}
