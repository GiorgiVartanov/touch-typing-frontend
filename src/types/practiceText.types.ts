import { User } from "./auth.types"
import { KeyboardLanguageType } from "./typer.types/typingSettings.types"

export interface PvPMatch {
  _id: string
  title: string
  opponents: User[]
  winner: User
  text: string
  duration: number
  ratingChange: number
}

// export type PracticeTextTag =

export interface Text {
  _id: string
  title: string
  language: KeyboardLanguageType
  description: string
  author: string
  level: DifficultyLevel
  text: string
  publishedOn: string
  wordSeparator?: string
}

export interface HistoryItem {
  _id: string
  date: string
  duration: number
  WPM: number
  accuracy: number
  item: Text | PvPMatch
}

export type DifficultyLevel =
  | "Any"
  | "Easy"
  | "Intermediate"
  | "Normal"
  | "Hard"
  | "Advanced"
  | "Expert"
  | "none"

export interface PracticeTextApiResponse {
  data: Text[]
}
