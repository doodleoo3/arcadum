import React, {useEffect} from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
import styles from "./CreateGamePage.module.scss"
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
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
    }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <h1>CREATE A NEW GAME</h1>
                <p>WITH YOUR FRIENDS</p>
            </PageContainerItem>

            <PageContainerItem>
                <h1>YOUR INVITE CODE</h1>
                <p className={styles.invite__code}>INVITE CODE <FontAwesomeIcon icon={faCopy}/></p>
            </PageContainerItem>

            <div className={styles.__blank}></div>
        </PageContainer>
    );
};

export default CreateGamePage;