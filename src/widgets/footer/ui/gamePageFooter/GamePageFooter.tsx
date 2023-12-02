import React from 'react';
import styles from "./GamePageFooter.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faComment, faArrowAltCircleLeft, faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";
import {useTelegram} from "../../../../shared/lib/hooks/useTelegram";

const GamePageFooter = () => {
    const {tg} = useTelegram()

    return (
        <div className={styles.footer} style={tg.colorScheme === "light" ? {backgroundImage: `url("/assets/images/arcadum-bg-light.png")`} : {backgroundImage: `url("/assets/images/arcadum-bg-dark.png")`}}>
            <div className={styles.button__wrapper}>
                <FontAwesomeIcon icon={faFlag} />
            </div>
            <div className={styles.button__wrapper}>
                <FontAwesomeIcon icon={faComment} />
            </div>
            <div className={styles.button__wrapper}>
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </div>
            <div className={styles.button__wrapper}>
                <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </div>
        </div>
    );
};

export default GamePageFooter;