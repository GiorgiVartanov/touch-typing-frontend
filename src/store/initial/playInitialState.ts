import { PlayState } from "../../types/play.types"

export const playInitialState: PlayState = {
  socket: undefined,
  uid: "",
  users: [],
  matches: {},
}
