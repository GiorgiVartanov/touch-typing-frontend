import ajax from "./ajax"

import { savedKeyboardLayoutInterface } from "../types/typer.types/typingSettings.types"

export const saveTypingSetting = (
  typingSettingToChange: string,
  value: string | number | boolean,
  token: string
) =>
  ajax.post(
    "/typingsettings",
    { typingSettingToChange, value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

export const getTypingSettings = (token: string) => {
  return ajax.get("/typingsettings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const saveLayout = (layout: savedKeyboardLayoutInterface, token: string) => {
  return ajax.post(
    "/typingsettings/layout",
    { layout },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getLayout = (token: string) => {
  return ajax.get("/layout/getselected", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
