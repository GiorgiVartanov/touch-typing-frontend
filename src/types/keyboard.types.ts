import { User } from "./auth.types"
import { KeyboardLanguageType } from "./typer.types/typingSettings.types"

export type KeyType = "Letter" | "Symbol" | "Digit" | "Modifier"

export type KeyInterface =
  | {
      code: string
      value: string[]
      type: "Letter" | "Symbol" | "Digit"
    }
  | {
      code: string
      value: string
      type: "Modifier"
    }

export interface ModifierKeyInterface {
  code: string
  value: string
  type: "Modifier"
}

export interface KeyboardLayoutInterface {
  _id: string
  title: string
  keyboard: KeyInterface[]
  language: KeyboardLanguageType
  public: boolean
  official: boolean
  user: User
}
