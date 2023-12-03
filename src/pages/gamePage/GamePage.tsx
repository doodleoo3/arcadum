import React, { useContext, useEffect, useRef, useState } from 'react';
import GamePageContainer from '../../shared/ui/gamePageContainer/GamePageContainer';
import Board from '../../widgets/game/board/ui/Board';
import { GameContext } from '../../widgets/game/board/lib/context/GameContext';
import PlayerInfo from '../../widgets/game/playerInfo/ui/PlayerInfo';
import MovesList from '../../widgets/game/movesList/ui/MovesList';
import { Chess, Square } from 'chess.js';
import { createBoard } from '../../widgets/game/board/lib/createBoard';
import { types } from '../../widgets/game/board/lib/context/GameTypes';
import { getGameOverState } from '../../widgets/game/board/lib/gameOver';
import GamePageFooter from '../../widgets/footer/ui/gamePageFooter/GamePageFooter';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../../shared/lib/hooks/useTelegram';
import axios from 'axios';

const GamePage = () => {
    const { dispatch, state } = useContext(GameContext);
    const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

    const { current: chess } = useRef(new Chess(fen));

    const [board, setBoard] = useState(createBoard(fen, state.playerColor));

    const fromPos = useRef<string>('');

    const [selectedCell, setSelectedCell] = useState<Square | null>(null);

    const [moveHistory, setMoveHistory] = useState<Array<{ white: string; black: string | null }>>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async () => {
            await axios
                .get('https://www.malccement.ru/game', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then((result) => {
                    const data = result.data;
                    const gamePlayer = data.players[0];

                    setFen(data.fen);
                    dispatch({ type: types.SET_TURN, player: data.turn, check: false });
                    dispatch({ type: types.SET_MY_TURN, player: gamePlayer.side });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 300);

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(interval);
    }, [dispatch]);

    // const socket = io('localhost:5000');

    const updateMoveHistory = (move: string) => {
        setMoveHistory((prevHistory) => {
            const lastMove = prevHistory[prevHistory.length - 1];
            if (lastMove && !lastMove.black) {
                return [...prevHistory.slice(0, -1), { ...lastMove, black: move }];
            } else {
                return [...prevHistory, { white: move, black: null }];
            }
        });
    };

    const makeMove = (pos: string) => {
        const from = selectedCell;
        const to = pos;
        if (from && from !== to) {
            try {
                const moveResult = chess.move({ from, to });
                if (moveResult) {
                    const moveSAN = moveResult.san;
                    updateMoveHistory(moveSAN);

                    dispatch({ type: types.CLEAR_POSSIBLE_MOVES });

                    setFen(chess.fen());
                    setSelectedCell(null);
                    // socket.emit('move', { gameID: '20', from, to: pos });

                    axios.post(
                        'https://www.malccement.ru/makeTurn',
                        {
                            from,
                            to,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        },
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    const setFromPos = (pos: Square) => {
        fromPos.current = pos;
        const moves = chess.moves({ square: pos });

        const piece = chess.get(pos);

        if (state.turn !== state.myTurn || piece.color !== state.myTurn) {
            return;
        }

        dispatch({
            type: types.SET_POSSIBLE_MOVES,
            moves: moves,
        });
        setSelectedCell(pos);
    };

    useEffect(() => {
        setBoard(createBoard(fen, state.playerColor));
        console.log(fen);
    }, [fen]);

    useEffect(() => {
        const [gameOver, status] = getGameOverState(chess);

        if (gameOver) {
            dispatch({ type: types.GAME_OVER, status, player: chess.turn() });
            return;
        }

        dispatch({
            type: types.SET_TURN,
            player: chess.turn(),
            check: chess.inCheck(),
        });
    }, [fen, dispatch, chess]);

    // useEffect(() => {
    //     socket.emit('join', { name: 'Frank', gameID: '20' }, (response: { error?: string, color?: "w" | "b"  }) => {
    //         if (response.error) {
    //             console.log('Error:', response.error);
    //         } else if (response.color) {
    //             console.log('Color:', response.color);
    //         }
    //     });
    //
    //     socket.on('welcome', ({ message, opponent }) => {
    //         console.log({ message, opponent });
    //     });
    //
    //     socket.on('opponentJoin', ({ message, opponent }) => {
    //         console.log({ message, opponent });
    //     });
    //
    //     socket.on('opponentMove', ({ from, to }) => {
    //         chess.move({ from, to });
    //         setFen(chess.fen());
    //     });

    //     socket.on('message', ({ message }) => {
    //         console.log({ message });
    //     });
    // }, [chess]);

    useEffect(() => {
        if (state.gameOver) {
            localStorage.setItem('status', state.status);
            navigate('/game_over');
        }
    }, [state]);

    return (
        <GamePageContainer>
            {/*{state.gameOver*/}
            {/*    && <GameOverModal/>*/}
            {/*}*/}
            <MovesList moveHistory={moveHistory} />
            <PlayerInfo isOpponent={true}></PlayerInfo>

            <Board board={board} setFromPos={setFromPos} makeMove={makeMove} selectedCell={selectedCell} />

            <PlayerInfo></PlayerInfo>

            <GamePageFooter></GamePageFooter>
        </GamePageContainer>
    );
};

export default GamePage;
