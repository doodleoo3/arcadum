import React, {useContext, useEffect, useState} from 'react';
import styles from "./GameOverPage.module.scss"
import {GameContext} from "../../widgets/game/board/lib/context/GameContext";
const GameOverPage = () => {
    const {state} = useContext(GameContext)

    const [winner, setWinner] = useState<string | null>(null)

    useEffect(() => {
        if (state.status === 'checkmate') {
            if (state.turn === 'b') {
                setWinner('white')
            } else {
                setWinner('black')
            }
        }
    }, [state.status, state.turn]);


    return (
        <div className={styles.modal}>
            <h1>GAME OVER</h1>
            <p>THE GAME ENDED IN A {state.status.toUpperCase()}</p>
            {winner && <p>{winner.toUpperCase()} WON</p>}
            <button>PLAY AGAIN</button>
        </div>
    );
};

export default GameOverPage;