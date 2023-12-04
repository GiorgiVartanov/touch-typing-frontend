import { Socket } from "socket.io-client";
import { GameStateList } from "./game.types";

export interface PlayState {
    socket: Socket | undefined;
    uid: string;
    username?: string
    users: string[];
    game_id?: string;
    games: GameStateList;
    match_finished?: boolean;
}

export interface PlayActions {
    StartListeners: () => void;
    SendHandshake: () => void;
    CreateGame: (text: string, time_limit: number, user_limit: number) => void;
    JoinGame: (gid: string) => void;
    LeaveGame: (game_id: string) => void;
    ModifyMatch: (currentWordIndex: number) => void;
    NotifyFinish: (user_wpm: number) => void;
}