import React, {useEffect, useState} from 'react';
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
import styles from "./JoinGamePage.module.scss";
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
            is_active: true,
            is_visible: true
        })
    }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <h1 className={styles.title__wrapper}>JOIN THE GAME</h1>

                <div>
                    <p>WAITING FOR CODE</p>
                    {/*<p>GAME PARAMS:</p>*/}
                    {/*<p>TIME - </p>*/}
                    {/*<p>COST - </p>*/}
                </div>
                
                <div></div>
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.title__wrapper}><h1>ENTER THE INVITE CODE</h1></div>
                <div className={styles.invite__wrapper}><input className={styles.invite__code}></input></div>
                <div><button className={styles.check__code}>GET NETWORK PARAMS</button></div>
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