import React from 'react';
import styles from "./Footer.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFlag, faComment, faArrowAltCircleLeft, faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
    return (
        <div className={styles.footer}>
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

export default Footer;