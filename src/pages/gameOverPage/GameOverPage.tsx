import React, {useContext, useEffect, useState} from 'react';
import styles from "./GameOverPage.module.scss"
import {GameContext} from "../../widgets/game/board/lib/context/GameContext";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
const GameOverPage = () => {
    const {state} = useContext(GameContext)

    const [winner, setWinner] = useState<string | null>(null)

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

    // const {tg, user} = useTelegram();

    // useEffect(() => {
    //     tg.MainButton.setParams({
    //         text: "PLAY AGAIN",
    //         color: tg.themeParams.secondary_bg_color,
    //         text_color: tg.themeParams.text_color,
    //         is_active: true,
    //         is_visible: true
    //     })
    // }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <h1>GAME OVER</h1>

                <p>THE GAME ENDED IN A {localStorage.getItem('status') ? localStorage.getItem('status') : state.status}</p>
            </PageContainerItem>

            <PageContainerItem>
                {/*<h1>@{user.username} WON FOR {winner ? winner?.toUpperCase() : localStorage.getItem('winner')}</h1>*/}
                <p>YOU CAN START A NEW GAME BY CLICKING THE BUTTON BELOW</p>
            </PageContainerItem>

            <div className={styles.__blank}></div>
        </PageContainer>
    );
};

export default GameOverPage;