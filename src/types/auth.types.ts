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
  usernameError: string[]
  passwordError: string[]
  confirmPasswordError: string[]
}

export interface LoginCredentialsError {
  usernameError: string[]
  passwordError: string[]
}

export interface User {
  username: string
  rating: number
  friends: string[]
  completedAssessments: number[]
  accountType: "User" | "Admin"
}

export interface UserData extends User {
  _id: string
  sentFriendRequests: string[]
}
