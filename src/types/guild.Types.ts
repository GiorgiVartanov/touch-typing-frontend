import { userIdType } from "./auth.types"

export type GuildType = {
  _id: string
  name: string
  motto: string
  members: userIdType[]
}
