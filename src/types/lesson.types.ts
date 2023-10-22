import { userIdType } from "./auth.types"

export type PvPMatchType = {
  _id: string
  opponents: userIdType[]
  winner: userIdType
  timestamp: Date
  text: string
}

export type LessonType = {
  _id: string
  image?: string
  title: string
  description: string
  approximateDuration: number
  level: "Beginner" | "Intermediate" | "Expert" | "Advanced"
  text: string
}

export type LessonResponseType = {
  Beginner: LessonType[]
  Intermediate: LessonType[]
  Advanced: LessonType[]
  Expert: LessonType[]
}
