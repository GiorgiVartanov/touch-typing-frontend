import { Socket } from "socket.io-client"
import { MatchStateList } from "../../types/match.types"


export const UPDATE_SOCKET = "UPDATE_SOCKET"
export const UPDATE_UID    = "UPDATE_UID"
export const UPDATE_USERS  = "UPDATE_USERS"
export const REMOVE_USER   = "REMOVE_USER"
export const UPDATE_MATCHID   = "UPDATE_MATCHID"
export const UPDATE_MATCHES  = "UPDATE_MATCHES"
export const UPDATE_MATCH  = "UPDATE_MATCH"
export const UPDATE_MATCH_FINISHED  = "UPDATE_MATCH_FINISHED"
export const UPDATE_USERNAME = "UPDATE_USERNAME"

export const updateSocket = (
    socket: Socket
): { type: typeof UPDATE_SOCKET; payload: Socket} => ({
    type: UPDATE_SOCKET,
    payload: socket,
})

export const updateUID = (
    uid: string
): { type: typeof UPDATE_UID; payload: string } => ({
    type: UPDATE_UID,
    payload: uid,
})

export const updateUsers = (
    users: string[]
): { type: typeof UPDATE_USERS; payload: string[] } => ({
    type: UPDATE_USERS,
    payload: users,
})

export const removeUser = (
    user: string
): {type: typeof REMOVE_USER; payload: string} => ({
    type: REMOVE_USER,
    payload: user
})

export const updateMatchId = (
    match_id : string | undefined
) : {type: typeof UPDATE_MATCHID; payload: string | undefined} => ({
    type: UPDATE_MATCHID,
    payload: match_id,
})

export const updateMatches = (
    matches: MatchStateList
) : {type: typeof UPDATE_MATCHES; payload: MatchStateList} => ({
    type: UPDATE_MATCHES,
    payload: matches,
})

export const updateMatch = (
    users_progress: {[uid:string]: number} | undefined
) : {type: typeof UPDATE_MATCH; payload: {[uid:string]: number} | undefined} => ({
    type: UPDATE_MATCH,
    payload: users_progress,
})

export const finishMatch = (
    match_finished: boolean
) : {type: typeof UPDATE_MATCH_FINISHED; payload: boolean} => ({
    type: UPDATE_MATCH_FINISHED,
    payload: match_finished,
})

export const updateUsername = (
    username: string
) : {type: typeof UPDATE_USERNAME; payload: string} => ({
    type: UPDATE_USERNAME,
    payload: username,
})