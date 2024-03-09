import React, { PropsWithChildren, createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { PlayActions, PlayState } from '../../types/play.types';
import { playInitialState } from '../initial/playInitialState';
import { PlayReducer } from '../reducers/playReducers';
import { finishMatch, removeUser, updateMatchId, updateMatches, updateSocket, updateUID, updateUsername, updateUsers } from '../actions/playActions';
import Loading from '../../components/Loading/Loading';
import { MatchStateList } from '../../types/match.types';
import { useAuthStore } from './authContext';
import { TextRequestFake } from '../../components/Form/Data/FakeWordsForm';
import { TextRequestWord } from '../../components/Form/Data/CorpusForm';

const SERVER_URL = import.meta.env.VITE_SERVER_URL

interface ContextInterface extends PlayState, PlayActions {}

const PlayContext = createContext<ContextInterface>({} as ContextInterface);

export const usePlayStore = () => useContext(PlayContext)

export interface Props extends PropsWithChildren {}

const PlayProvider: React.FunctionComponent<Props> = ({children} : Props) => {
    const socket = useSocket(SERVER_URL, {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        autoConnect: false
    });

    const [PlayState, PlayDispatch] = useReducer(PlayReducer, playInitialState);
    const [loading, setLoading] = useState(true);
    const {user, token} = useAuthStore()

    useEffect(() => {
        if (socket.connected){
            socket.disconnect()
        }
        socket.connect();
        PlayDispatch(updateSocket(socket));
        StartListeners();
        SendHandshake();
    }, [user]);

    const StartListeners = () => {
        /** Messages */
        socket.on('user_connected', (users: string[]) => {
            //User connected message received
            PlayDispatch(updateUsers(users));
        });

        /** Messages */
        socket.on('user_disconnected', (params: {uid: string, matches: MatchStateList | undefined}) => {
            //User disconnected message received
            PlayDispatch(removeUser(params.uid));
            if(params.matches)
                PlayDispatch(updateMatches(params.matches))
        });

        /** Connection / reconnection listeners */
        socket.io.on('reconnect', (attempt) => {
            console.info('Reconnected on attempt: ' + attempt);
            SendHandshake();
        });

        socket.io.on('reconnect_attempt', (attempt) => {
            console.info('Reconnection Attempt: ' + attempt);
        });

        socket.io.on('reconnect_error', (error) => {
            console.info('Reconnection error: ' + error);
        });

        socket.io.on('reconnect_failed', () => {
            //Reconnection failure.
            alert('We are unable to connect you to the play service. Please make sure your internet connection is stable or try again later.');
        });

        socket.on('match_added', (matches: MatchStateList) => {
            //match_added event listened
            PlayDispatch(updateMatches(matches))
        })

        socket.on('matches_modified', (matches: MatchStateList) => {            
            //matches have been modified
            PlayDispatch(updateMatches(matches));
        })

        socket.on('match_modified', (matches: MatchStateList) => {
            //match has been modified
            PlayDispatch(updateMatches(matches));
        })

        socket.on('match_finished', (params: {matches: MatchStateList, match_id: string}) => {
            //match has finished            
            PlayDispatch(updateMatches(params.matches))
            PlayDispatch(updateMatchId(params.match_id)) //match_id turns from uuid to mongoose.Types.ObjectId
            PlayDispatch(finishMatch(true))
        })

        socket.on("already_connected", () => {
            //already connected from a different tab
            PlayDispatch(updateUsername("-1")); //Reserved username, lazy to add another boolean variable...
        })

    };

    const SendHandshake = async () => {
        //Sending handshake to server ...        

        socket.emit('handshake', token, user?.username, async (username: string, uid: string, users: string[], match_id: string | undefined, matches:  MatchStateList) => {
            //User handshake callback message received
            PlayDispatch(updateUsers(users));
            PlayDispatch(updateUID(uid));
            if(match_id)
                PlayDispatch(updateMatchId(match_id));
            PlayDispatch(updateMatches(matches));
            PlayDispatch(updateUsername(username)) //Random usernames for guests...
        });

        setLoading(false);
    };

    const CreateMatch = async (req: TextRequestFake | TextRequestWord, time_limit: number, user_limit: number) => {
        //trying to create a match
        socket.emit('create_match',  
            req, 
            time_limit, 
            user_limit, 
            async (match_id: string, matches: MatchStateList) => {
                //the match has successfully been created! callback                
                PlayDispatch(updateMatchId(match_id));
                PlayDispatch(updateMatches(matches));
            }
        );
    }

    const JoinMatch = async(match_id: string) => {
        //joining the match
        socket.emit('join_match', match_id, async () => {
            //match joined callback
            PlayDispatch(updateMatchId(match_id))            
        });
    }

    const LeaveMatch = async(match_id: string) => {
        //leaving the match
        PlayDispatch(updateMatchId(undefined))
        if(PlayState.match_finished)
            PlayDispatch(finishMatch(false))
        socket.emit('leave_match', match_id, async () => {
            //left the match
        })
    }

    const ModifyMatch = async(currentWordIndex: number) => {
        //notifying other players about current progress
        socket.emit('modify_match', PlayState.match_id, currentWordIndex, async ()=>{});
    }

    const NotifyFinish = async(user_wpm: number) => {
        //Notifying everyone about your finish
        socket.emit('user_finish', user_wpm, PlayState.match_id, async ()=>{});
    }

    if (loading) return <Loading/>;

    const store = {
        ...PlayState,
        StartListeners,
        SendHandshake, 
        CreateMatch,
        JoinMatch,
        LeaveMatch,
        ModifyMatch,
        NotifyFinish,
    }

    return <PlayContext.Provider value={store}>{children}</PlayContext.Provider>;
};

export default PlayProvider;