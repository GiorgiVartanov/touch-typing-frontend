import ajax from "./ajax"

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

export const getTypingSettings = (token: string) =>
  ajax.get("/typingsettings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
