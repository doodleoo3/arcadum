import React, {useEffect} from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
import styles from "./CreateGamePage.module.scss"
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const CreateGamePage = () => {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.setParams({
            text: "INVITE FRIENDS",
            color: tg.themeParams.secondary_bg_color,
            text_color: tg.themeParams.text_color,
            is_active: true,
            is_visible: true
        })
        // tg.MainButton.setText("INVITE FRIENDS")
        // tg.MainButton.show()
        // tg.MainButton.enable()
        // tg.MainButton.themeParams.color()
    }, []);

    return (
        <PageContainer>
            <div className={styles.wrapper}>
                <h1>CREATE NEW GAME</h1>
                <p>WITH YOUR FRIENDS</p>
            </div>

            <div className={styles.wrapper}>
                <h1>YOUR INVITE CODE</h1>
                <p className={styles.invite__code}>INVITE CODE <FontAwesomeIcon icon={faCopy}/></p>
            </div>

            <div className={styles.__blank}></div>
        </PageContainer>
    );
};

export default CreateGamePage;