import { userIdType } from "./auth.types"

export type CommunityType = {
  _id: string
  name: string
  motto: string
  members: userIdType[]
}
