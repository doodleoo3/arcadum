import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { GameContext } from '../../../widgets/game/board/lib/context/GameContext';
import { types } from '../../../widgets/game/board/lib/context/GameTypes';

interface TimerProps {
    isOpponent?: boolean;
}
const Timer: FC<TimerProps> = ({ isOpponent }) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const { state, dispatch } = useContext(GameContext);

    function decrementBlackTimer() {
        setBlackTime((prev) => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev) => prev - 1);
    }

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const callback = state.turn === 'w' ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    useEffect(() => {
        startTimer();
    }, [state.turn]);

    useEffect(() => {
        if (whiteTime === 0 || blackTime === 0) {
            dispatch({ type: types.GAME_OVER, status: 'time', player: state.turn });
        }
    }, [whiteTime, blackTime]);

    if (isOpponent) {
        if (state.myTurn === 'w') {
            return (
                <h3>{`${Math.floor(blackTime / 60)} : ${
                    blackTime % 60 < 10 ? `0${blackTime % 60}` : blackTime % 60
                }`}</h3>
            );
        } else
            return (
                <h3>{`${Math.floor(whiteTime / 60)} : ${
                    whiteTime % 60 < 10 ? `0${whiteTime % 60}` : whiteTime % 60
                }`}</h3>
            );
    }

    return state.myTurn === 'w' ? (
        <h3>{`${Math.floor(whiteTime / 60)} : ${whiteTime % 60 < 10 ? `0${whiteTime % 60}` : whiteTime % 60}`}</h3>
    ) : (
        <h3>{`${Math.floor(blackTime / 60)} : ${blackTime % 60 < 10 ? `0${blackTime % 60}` : blackTime % 60}`}</h3>
    );
};

export default Timer;
