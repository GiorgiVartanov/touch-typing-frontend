import ajax from "./ajax"

import { KeyInterface } from "../types/keyboard.types"

// save keyboard on a server
export const saveKeyboardOnServer = (
  layout: { keyboard: KeyInterface[]; title: string; language: string },
  token: string
) => {
  return ajax.post(
    "/layout/add",
    { layout: layout },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getLayouts = (text: string, language: string, pageParam: number) => {
  // CHANGE HERE !!!
  return ajax.get(`layout/search?text=${text}&language=${language}&page=${pageParam}`)
}

export const getLayout = (id: string) => {
  return ajax.get(`layout/get/${id}`)
}
