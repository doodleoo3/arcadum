import React, {useContext, useEffect, useState} from 'react';
import styles from "./GameOverPage.module.scss"
import {GameContext} from "../../widgets/game/board/lib/context/GameContext";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
import {useNavigate} from "react-router-dom";
const GameOverPage = () => {
    const {state} = useContext(GameContext)
    const [winner, setWinner] = useState<string | null>(null)
    const {tg, user} = useTelegram();

    const navigate = useNavigate();

    useEffect(() => {
        if (state.status === 'checkmate') {
            if (state.turn === 'b') {
                setWinner('white')
                localStorage.setItem('winner', 'white')
            } else {
                setWinner('black')
                localStorage.setItem('winner', 'black')
            }
        }
    }, [state.status, state.turn]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "REMATCH",
            is_active: true,
            is_visible: true
        })
    }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <h1>GAME OVER</h1>
                {state.status === 'draw' || state.status === 'stalemate'
                    ?
                    <>{localStorage.getItem('status') ? localStorage.getItem('status') : state.status}</>
                    :
                    <>
                        <p>@{user.username} WON PLAYING FOR <span style={winner === "white" ? {color: "white"} : {color: "black"}}>{winner ? winner?.toUpperCase() : localStorage.getItem('winner')}</span></p>
                        <p>{localStorage.getItem('status') ? localStorage.getItem('status') : state.status}</p>
                    </>
                }
            </PageContainerItem>

            <PageContainerItem>
                <h1>REWARD</h1>
                {state.status === 'draw' || state.status === 'stalemate'
                    ? <p>{`<AMOUNT>`}$SOL REMAINS IN YOUR WALLET</p>
                    : <p>{`<AMOUNT>`}$SOL HAVE ALREADY BEEN SENT TO THE WINNER</p>
                }
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.new__game__btn}>
                    <button onClick={() => navigate("/create")}>CREATE A NEW GAME</button>
                    <button onClick={() => navigate("/join")}>JOIN A NEW GAME</button>
                </div>
            </PageContainerItem>
        </PageContainer>
    );
};

export default GameOverPage;