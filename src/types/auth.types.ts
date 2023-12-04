import { CommunityType } from "./community.types"
import { HistoryItem, Lesson } from "./typing.types"
import { AchievementType } from "./achievement.types"

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  password: string
  confirmPassword: string
}

export interface RegisterCredentialsError {
  usernameError: string[] | []
  passwordError: string[] | []
  confirmPasswordError: string[] | []
}

export interface LoginCredentialsError {
  usernameError: string[] | []
  passwordError: string[] | []
}

export interface User {
  _id: string
  username: string
  rating: number
}

export interface UserData extends User {
  biography: string
  accountType: "User" | "Admin"
  guild?: CommunityType
  friends: User[]
  followers: User[]
  following: User[]
  completedAchievements: AchievementType[]
  lessons: {
    stats: {
      beginner: number
      intermediate: number
      expert: number
      advanced: number
    }
    history: HistoryItem[]
    completed: Lesson[]
  }
}
