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
