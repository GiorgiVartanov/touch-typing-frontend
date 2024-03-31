export type KeyType = "Letter" | "Letters" | "Symbol" | "Digit" | "Modifier"

export interface KeyInterface {
  code: string
  value: string | string[]
  type: KeyType
}
