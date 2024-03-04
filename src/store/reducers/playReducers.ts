import { Socket } from "socket.io-client";
import { PlayState } from "../../types/play.types";
import { UPDATE_MATCH_FINISHED, REMOVE_USER, UPDATE_MATCHID, UPDATE_MATCHES, UPDATE_MATCH, UPDATE_SOCKET, UPDATE_UID, UPDATE_USERS, UPDATE_USERNAME } from "../actions/playActions";
import { MatchStateList } from "../../types/match.types";

export type PlayActions = 
    | {type: typeof UPDATE_SOCKET; payload: Socket}
    | {type: typeof UPDATE_UID; payload: string}
    | {type: typeof UPDATE_USERS; payload: string[]}
    | {type: typeof REMOVE_USER; payload: string}
    | {type: typeof UPDATE_MATCHID; payload: string | undefined}
    | {type: typeof UPDATE_MATCHES; payload: MatchStateList}
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
        case UPDATE_MATCHID:
            return { ...state, match_id: action.payload};
        case UPDATE_MATCHES:
            return { ...state, matches: action.payload};
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
