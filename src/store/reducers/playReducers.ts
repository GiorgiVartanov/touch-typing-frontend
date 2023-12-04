import { Socket } from "socket.io-client";
import { PlayState } from "../../types/play.types";
import { UPDATE_MATCH_FINISHED, REMOVE_USER, UPDATE_GAMEID, UPDATE_GAMES, UPDATE_MATCH, UPDATE_SOCKET, UPDATE_UID, UPDATE_USERS, UPDATE_USERNAME } from "../actions/playActions";
import { GameStateList } from "../../types/game.types";

export type PlayActions = 
    | {type: typeof UPDATE_SOCKET; payload: Socket}
    | {type: typeof UPDATE_UID; payload: string}
    | {type: typeof UPDATE_USERS; payload: string[]}
    | {type: typeof REMOVE_USER; payload: string}
    | {type: typeof UPDATE_GAMEID; payload: string | undefined}
    | {type: typeof UPDATE_GAMES; payload: GameStateList}
    | {type: typeof UPDATE_MATCH; payload: {[uid:string]: number} | undefined}
    | {type: typeof UPDATE_MATCH_FINISHED; payload: boolean}
    | {type: typeof UPDATE_USERNAME; payload: string}

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
        case UPDATE_MATCH:
            return { ...state, users_progress: action.payload};
        case UPDATE_MATCH_FINISHED:
            return { ...state, match_finished: action.payload};
        case UPDATE_USERNAME:
            return { ...state, username: action.payload};
        default:
            return state;
    }
};
