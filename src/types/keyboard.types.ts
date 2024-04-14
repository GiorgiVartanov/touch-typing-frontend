import { User } from "./auth.types"

export type KeyType = "Letter" | "Symbol" | "Digit" | "Modifier"

export interface KeyInterface {
  code: string
  value: string[]
  type: "Letter" | "Symbol" | "Digit"
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
  language: string
  public: boolean
  official: boolean
  user: User
}
