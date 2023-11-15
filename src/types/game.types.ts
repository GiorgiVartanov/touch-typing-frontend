//to be upgraded...
export interface GameState {
    gul: string[], //game_user_list
    text: string,
    time_limit: number,
    user_limit: number,
}

export interface GameStateList {
    [gid:string] : GameState
}