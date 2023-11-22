import { Socket } from "socket.io-client"
import { GameStateList } from "../../types/game.types"


export const UPDATE_SOCKET = "UPDATE_SOCKET"
export const UPDATE_UID    = "UPDATE_UID"
export const UPDATE_USERS  = "UPDATE_USERS"
export const REMOVE_USER   = "REMOVE_USER"
export const UPDATE_GAMEID   = "UPDATE_GAMEID"
export const UPDATE_GAMES  = "UPDATE_GAMES"
export const UPDATE_MATCH  = "UPDATE_MATCH"
export const UPDATE_MATCH_FINISHED  = "UPDATE_MATCH_FINISHED"

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

export const updateGameId = (
    game_id : string | undefined
) : {type: typeof UPDATE_GAMEID; payload: string | undefined} => ({
    type: UPDATE_GAMEID,
    payload: game_id,
})

export const updateGames = (
    games: GameStateList
) : {type: typeof UPDATE_GAMES; payload: GameStateList} => ({
    type: UPDATE_GAMES,
    payload: games,
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
