export interface GameState {
    possibleMoves: string[];
    turn: 'w' | "b",
    check: boolean,
    gameOver: boolean,
    status: string,
    playerName: string,
    playerColor: string,
    opponentName: string,
    message: string,
    opponentMoves: string[],
}

export type GameAction =
    | { type: 'SET_POSSIBLE_MOVES'; moves: string[] }
    | { type: 'CLEAR_POSSIBLE_MOVES' }
    | { type: 'SET_TURN'; player: "w" | "b"; check: boolean}
    | {type: "GAME_OVER"; player: "w" | "b"; status: string}
    | {type: "SET_PLAYER"; name: string}
    | {type: "SET_PLAYER_COLOR"; color: "w" | "b"}
    | {type: "SET_OPPONENT"; name: string}
    | {type: "SET_MESSAGE"; message: string}
    | {type: "CLEAR_MESSAGE";}
    | {type: "SET_OPPONENT_MOVES";  moves: string[]}
    | {type: "CLEAR_OPPONENT_MOVES";}

export const types = {
    SET_POSSIBLE_MOVES: 'SET_POSSIBLE_MOVES',
    CLEAR_POSSIBLE_MOVES: 'CLEAR_POSSIBLE_MOVES',
    SET_TURN: 'SET_TURN',
    GAME_OVER: "GAME_OVER",

    SET_PLAYER: 'SET_PLAYER',
    SET_OPPONENT: 'SET_OPPONENT',
    SET_PLAYER_COLOR: 'SET_PLAYER_COLOR',
    SET_MESSAGE: 'SET_MESSAGE',
    CLEAR_MESSAGE: 'CLEAR_MESSAGE',
    SET_OPPONENT_MOVES: 'SET_OPPONENT_MOVES',
    CLEAR_OPPONENT_MOVES: 'CLEAR_OPPONENT_MOVES',
} as const;
