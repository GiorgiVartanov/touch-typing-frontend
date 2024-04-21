import ajax from "./ajax"

export const saveAppSetting = (
  appSettingToChange: string,
  value: string | number | boolean,
  token: string
) => {
  return ajax.post(
    "/appsettings",
    { appSettingToChange, value },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const getAppSettings = (token: string) => {
  return ajax.get("/appsettings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
