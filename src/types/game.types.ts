//to be upgraded... has been updated
export interface GameState {
    _id: string,
    gul: Match,
    text: string, 
    time_limit: number, 
    user_limit: number,
    date: Date,
    has_started?: boolean,
    active_players: number,
    spectators: { [uid: string] : string },
}

export interface GameStateList {
    [gid:string] : GameState
}

export interface Match {
    [sid:string]: {WPM: number, has_finished?: boolean, username: string}
}