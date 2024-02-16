import { Socket } from "socket.io-client";
import { MatchStateList } from "./match.types";
import { TextRequestFake } from "../components/DataForm/FakeWordsForm";
import { TextRequestWord } from "../components/DataForm/CorpusForm";

export interface PlayState {
    socket: Socket | undefined;
    uid: string;
    username?: string
    users: string[];
    match_id?: string;
    matches: MatchStateList;
    match_finished?: boolean;
}

export interface PlayActions {
    StartListeners: () => void;
    SendHandshake: () => void;
    CreateMatch: (req: TextRequestFake | TextRequestWord, time_limit: number, user_limit: number) => void;
    JoinMatch: (match_id: string) => void;
    LeaveMatch: (match_id: string) => void;
    ModifyMatch: (currentWordIndex: number) => void;
    NotifyFinish: (user_wpm: number) => void;
}