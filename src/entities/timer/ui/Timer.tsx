import React, {FC, useContext, useEffect, useRef, useState} from 'react';
import {GameContext} from "../../../widgets/game/board/lib/context/GameContext";

interface TimerProps {
    isOpponent?: boolean
}
const Timer:FC<TimerProps> = ({isOpponent}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    const {state} = useContext(GameContext)

    function decrementBlackTimer() {
        setBlackTime(prev => prev -1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev -1)
    }

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current)
        }
        const callback = state.turn === "w" ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    useEffect(() => {
        startTimer()
    }, [state.turn]);


    if (isOpponent) {
        return <h3>{`${Math.floor(blackTime / 60)} : ${blackTime % 60 < 10 ? `0${blackTime % 60}` : blackTime % 60}`}</h3>
    }
    return <h3>{`${Math.floor(whiteTime / 60)} : ${whiteTime % 60 < 10 ? `0${whiteTime % 60}` : whiteTime % 60}`}</h3>

};

export default Timer;