import { Socket } from "socket.io-client";
import { PlayState } from "../../types/play.types";
import { REMOVE_USER, UPDATE_GAMEID, UPDATE_GAMES, UPDATE_SOCKET, UPDATE_UID, UPDATE_USERS } from "../actions/playActions";
import { GameStateList } from "../../types/game.types";

export type PlayActions = 
    | {type: typeof UPDATE_SOCKET; payload: Socket}
    | {type: typeof UPDATE_UID; payload: string}
    | {type: typeof UPDATE_USERS; payload: string[]}
    | {type: typeof REMOVE_USER; payload: string}
    | {type: typeof UPDATE_GAMEID; payload: string | undefined}
    | {type: typeof UPDATE_GAMES; payload: GameStateList}

export const PlayReducer = (state: PlayState, action: PlayActions) => {
    switch (action.type) {
        case UPDATE_SOCKET:
            return { ...state, socket: action.payload};
        case UPDATE_UID:
            return { ...state, uid: action.payload};
        case UPDATE_USERS:
            return { ...state, users: action.payload};
        case REMOVE_USER:
            return { ...state, users: state.users.filter((uid) => uid !== (action.payload)) };
        case UPDATE_GAMEID:
            return { ...state, game_id: action.payload};
        case UPDATE_GAMES:
            return { ...state, games: action.payload};
        default:
            return state;
    }
};
