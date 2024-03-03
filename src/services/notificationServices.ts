import ajax from "./ajax"

export const getNotifications = (token: string) => {
  return ajax.get(`/notification`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
