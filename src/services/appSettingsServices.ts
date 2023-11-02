import ajax from "./ajax"

export const saveAppSetting = (
  appSettingToChange: string,
  value: string | number | boolean,
  token: string
) =>
  ajax.post(
    "/appsettings",
    { appSettingToChange, value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
