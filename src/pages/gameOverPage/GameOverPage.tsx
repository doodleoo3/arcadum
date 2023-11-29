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

                <p>THE GAME ENDED IN A {localStorage.getItem('status') ? localStorage.getItem('status') : state.status}</p>
            </PageContainerItem>

            <PageContainerItem>
                <h1>@{user.username} WON FOR {winner ? winner?.toUpperCase() : localStorage.getItem('winner')}</h1>
                <p>THE FUNDS FOR THE CHESS GAME IN THE AMOUNT OF {`AMOUNT`} $SOL HAVE ALREADY BEEN SENT TO THE WINNER</p>
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.new__game__btn}>
                    <button onClick={() => navigate("/create")}>CREATE A NEW GAME</button>
                    <button onClick={() => navigate("/join")}>JOIN A NEW GAME</button>
                </div>
            </PageContainerItem>

            {/*<div className={styles.__blank}></div>*/}
        </PageContainer>
    );
};

export default GameOverPage;