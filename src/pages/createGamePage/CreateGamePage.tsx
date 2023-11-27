import React, {useEffect} from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
import styles from "./CreateGamePage.module.scss"
const CreateGamePage = () => {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.text("INVITE FRIENDS")
        tg.MainButton.isVisible(true)
        tg.MainButton.isActive(true)
    }, []);

    return (
        <PageContainer>
            <div className={styles.wrapper}>
                <h1>CREATE NEW GAME</h1>
                <p>WITH YOUR FRIENDS</p>
            </div>

            <div className={styles.wrapper}>
                <h1>YOUR INVITE CODE</h1>
                <p>INVITE CODE</p>
            </div>
        </PageContainer>
    );
};

export default CreateGamePage;