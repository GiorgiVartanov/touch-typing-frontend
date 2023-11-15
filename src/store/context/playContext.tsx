import React, { PropsWithChildren, createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { PlayActions, PlayState } from '../../types/play.types';
import { playInitialState } from '../initial/playInitialState';
import { PlayReducer } from '../reducers/playReducers';
import { removeUser, updateGameId, updateGames, updateSocket, updateUID, updateUsers } from '../actions/playActions';
import Loading from '../../components/Loading/Loading';
import { GameStateList } from '../../types/game.types';

const SERVER_URL = "http://localhost:5000" //env variables has "/api" as a suffix and that's a problem...

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
    // console.log("PlayProvider: ", PlayState)
    useEffect(() => {
        socket.connect();
        PlayDispatch(updateSocket(socket));
        StartListeners();
        SendHandshake();
    }, []);

    const StartListeners = () => {
        /** Messages */
        socket.on('user_connected', (users: string[]) => {
            console.info('User connected message received');
            PlayDispatch(updateUsers(users));
        });

        /** Messages */
        socket.on('user_disconnected', (params: {uid: string, games: GameStateList | undefined}) => {
            console.info('User disconnected message received');
            PlayDispatch(removeUser(params.uid));
            console.log(params)
            if(params.games)
                PlayDispatch(updateGames(params.games))
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
            console.info('Reconnection failure.');
            alert('We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later.');
        });

        socket.on('game_added', (games: GameStateList) => {
            console.log("game_added event listened")
            PlayDispatch(updateGames(games))
        })

        socket.on('game_modified', (games: GameStateList) => {            
            console.log('game has been modified')
            PlayDispatch(updateGames(games));
        })
    };

    const SendHandshake = async () => {
        console.info('Sending handshake to server ...');

        socket.emit('handshake', async (uid: string, users: string[], game_id: string | undefined, games:  GameStateList) => {
            console.info('User handshake callback message received');
            PlayDispatch(updateUsers(users));
            PlayDispatch(updateUID(uid));
            if(game_id)
                PlayDispatch(updateGameId(game_id));
            PlayDispatch(updateGames(games));
        });

        setLoading(false);
    };

    const CreateGame = async (text: string, time_limit: number, user_limit: number) => {
        console.info('trying to create a game');
        socket.emit('create_game',  
            text, 
            time_limit, 
            user_limit, 
            async (game_id: string, games:  GameStateList) => {
                console.info('game has successfully been created! callback');
                PlayDispatch(updateGameId(game_id));
                PlayDispatch(updateGames(games));
            }
        );
    }

    const JoinGame = async(game_id: string) => {
        console.info("joining a game");
        socket.emit('join_game', game_id, async (game_id: string) => {
            console.log("game joined callback")
            PlayDispatch(updateGameId(game_id))
        });
    }

    const LeaveGame = async(game_id: string) => {
        console.info("leaving a game");
        socket.emit('leave_game', game_id, async () => {
            console.info("dispatching from LeaveGame");
            PlayDispatch(updateGameId(undefined))
        })
    }

    if (loading) return <Loading/>;

    const store = {
        ...PlayState,
        StartListeners,
        SendHandshake, 
        CreateGame,
        JoinGame,
        LeaveGame,
    }

    return <PlayContext.Provider value={store}>{children}</PlayContext.Provider>;
};

export default PlayProvider;