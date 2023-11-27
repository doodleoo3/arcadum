import React, {useEffect, useState} from 'react';
import Button from "../../shared/ui/button/Button";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
import styles from "../gameOverPage/GameOverPage.module.scss";
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";

const JoinGamePage = () => {
    const [name, setName] = useState(''); // ИМЯ БУДЕТ БРАТЬСЯ ИЗ TELEGRAM'A
    const [gameID, setGameID] = useState('');

    useEffect(() => {
        const id = Math.random().toString().replace('0.', '');
        setGameID(id);
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: "JOIN GAME",
            color: tg.themeParams.secondary_bg_color,
            text_color: tg.themeParams.text_color,
            is_active: true,
            is_visible: true
        })
    }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <h1>JOIN THE GAME</h1>
                <p>WITH YOUR FRIENDS</p>
            </PageContainerItem>

            <PageContainerItem>
                <h1>ENTER THE INVITE CODE</h1>
                <input className={styles.invite__code}></input>
            </PageContainerItem>

            <div className={styles.__blank}></div>
        </PageContainer>
        // <div>
        //     <h2>Play Chess with your friends online</h2>
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             className="input"
        //             value={name}
        //             onChange={({ target }) => setName(target.value)}
        //             placeholder="Display Name"
        //         />
        //         <div className="gameId">Game ID: {gameID}</div>
        //         <hr />
        //         <p className="invite">Invite your friend over</p>
        //         {/*<ShareButtons*/}
        //         {/*    shareText={`https://onchess.xyz?id=${gameID}`}*/}
        //         {/*    subject="Join me for a game of Chess on Stack Chess"*/}
        //         {/*/>*/}
        //         <Button>Create</Button>
        //     </form>
        // </div>
    );
};

export default JoinGamePage;