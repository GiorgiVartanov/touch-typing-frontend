import { Socket } from "socket.io-client";
import { GameStateList } from "./game.types";

export interface PlayState {
    socket: Socket | undefined;
    uid: string;
    users: string[];
    game_id?: string;
    games: GameStateList;
}

export interface PlayActions {
    StartListeners: () => void;
    SendHandshake: () => void;
    CreateGame: (text: string, time_limit: number, user_limit: number) => void;
    JoinGame: (gid: string) => void;
    LeaveGame: (game_id: string) => void;
}