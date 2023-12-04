import { User } from "./auth.types"

export interface PvPMatch {
  _id: string
  title: string
  opponents: User[]
  winner: User
  text: string
  duration: number
  ratingChange: number
}

export interface Lesson {
  _id: string
  title: string
  description: string
  approximateDuration: number
  level: DifficultyLevel
  text: string
  wordSeparator?: string
}

export interface HistoryItem {
  _id: string
  date: string
  duration: number
  WPM: number
  accuracy: number
  item: Lesson | PvPMatch
}

export type DifficultyLevel = "Beginner" | "Intermediate" | "Expert" | "Advanced" | "none"

export interface LessonsApiResponse {
  Beginner: Lesson[]
  Intermediate: Lesson[]
  Advanced: Lesson[]
  Expert: Lesson[]
}

// export type HistoryItem = PvPMatch | LessonHistory
