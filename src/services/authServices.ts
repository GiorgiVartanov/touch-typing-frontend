import ajax from "./ajax"

import { registerCredentialsInterface, loginCredentialsInterface } from "../types/auth.types"

export const register = (userData: registerCredentialsInterface) =>
  ajax.post("/auth/register", userData) // registers user with the passed data
export const login = (userData: loginCredentialsInterface) => ajax.post("/auth/login", userData) // logs in user with the passed data
