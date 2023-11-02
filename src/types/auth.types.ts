import { CommunityType } from "./community.types"
import { LessonType, PvPMatchType } from "./lesson.types"
import { AchievementType } from "./achievement.types"
import { TypingSettingsInterface } from "./typingSettings.types"
import { AppSettingsInterface } from "./appSettings.types"

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
    stats: {
      beginner: number
      intermediate: number
      expert: number
      advanced: number
    }
    history: LessonType[]
    completed: LessonType[]
  }
  typingSettings: TypingSettingsInterface
  appSettings: AppSettingsInterface
}
