import React, { createContext, useReducer, ReactNode } from 'react';
import GameReducer from './GameReducer';
import { GameState, GameAction } from './GameTypes'


const initialState: GameState = {
    possibleMoves: [],
    turn: 'w',
    check: false,
    gameOver: false,
    status: '',

    playerName: '',
    opponentName: '',

    playerColor: '',
    message: '',

    opponentMoves: [],
};

interface GameProviderProps {
    children: ReactNode;
}

export const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
}>({ state: initialState, dispatch: () => null });

export const GameProvider = ({ children }: GameProviderProps) => {
    const [state, dispatch] = useReducer(GameReducer, initialState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
);
};
