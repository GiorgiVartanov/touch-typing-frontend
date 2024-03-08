import ajax from "./ajax"

import { RegisterCredentials, LoginCredentials } from "../types/auth.types"

// registers user with the passed data
export const register = (userData: RegisterCredentials) => ajax.post("/auth/register", userData)

// logs in user with the passed data
export const login = (userData: LoginCredentials) => ajax.post("/auth/login", userData)

// fetches data for a passed user
export const getUser = (username: string) => {
  return ajax.get(`/user/${username}`)
}

// fetches users whose username matches searchValue
export const getUsers = (searchValue: string) => {
  return ajax.get(`/user/search?username=${searchValue}`)
}
