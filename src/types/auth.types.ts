import { CommunityType } from "./community.types"
import { LessonType, PvPMatchType } from "./lesson.types"
import { AchievementType } from "./Achievement.types"

export interface loginCredentialsInterface {
  username: string
  password: string
}

export interface registerCredentialsInterface {
  username: string
  password: string
  confirmPassword: string
}

export interface registerCredentialsErrorInterface {
  usernameError: string[] | []
  passwordError: string[] | []
  confirmPasswordError: string[] | []
}

export interface loginCredentialsErrorInterface {
  usernameError: string[] | []
  passwordError: string[] | []
}

export type userIdType = {
  username: string
  _id: string
}

export type userType = {
  _id: string
  username: string
  rating: number
  biography: string
  accountType: "User" | "Admin"
  guild?: CommunityType
  friends: userIdType[]
  completedAchievements: AchievementType[]
  pvpHistory: PvPMatchType[]
  lessons: {
    stats: { beginner: number; intermediate: number; expert: number; advanced: number }
    history: LessonType[]
    completed: LessonType[]
  }
  settings: {
    preferredLanguage: "Eng" | "Geo"
    preferredTheme: "Dark" | "Light"
    isProfilePublic: boolean
    favoriteLayout: "QWERTY" // others will be added later
  }
}
