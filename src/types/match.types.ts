import { TextRequestWord } from "../components/Form/Data/CorpusForm"
import { TextRequestFake } from "../components/Form/Data/FakeWordsForm"

//to be upgraded... has been updated
export interface MatchState {
  _id: string
  players: PlayerStateList
  text: string
  time_limit: number
  user_limit: number
  date: Date
  has_started?: boolean
  request?: TextRequestFake | TextRequestWord
  active_players: number
  spectators: { [uid: string]: string }
}

export interface MatchStateList {
  [match_id: string]: MatchState
}

export interface PlayerStateList {
  [sid: string]: { WPM: number; has_finished?: boolean; username: string }
}
