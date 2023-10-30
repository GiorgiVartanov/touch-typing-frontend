import ajax from "./ajax"

export const saveTypingSetting = (
  typingSettingToChange: string,
  value: string | number,
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
