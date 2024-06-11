import { Socket } from "socket.io-client"
import { MatchStateList } from "./match.types"

export interface PlayState {
  socket: Socket | undefined
  uid: string
  username?: string
  users: string[]
  match_id?: string
  matches: MatchStateList
  match_finished?: boolean
}

export interface PlayActions {
  StartListeners: () => void
  SendHandshake: () => void
  CreateMatch: (req: RequestProps, time_limit: number, user_limit: number) => void
  JoinMatch: (match_id: string) => void
  LeaveMatch: (match_id: string) => void
  ModifyMatch: (currentWordIndex: number) => void
  NotifyFinish: (user_wpm: number) => void
}

export interface TextRequestWord {
  type?: string
  amount: Number
}

export interface TextRequestFake {
  type?: string
  letter: string
  amount: number
  minAmountOfSyllables: number
  maxAmountOfSyllables: number
}

export interface TextRequestSentence {
  type?: string
  amount: Number
}

export type RequestProps = TextRequestWord | TextRequestFake | TextRequestSentence
