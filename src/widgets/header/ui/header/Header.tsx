import React from 'react';
import styles from "./Header.module.scss"
import {useTelegram} from "../../../../shared/lib/hooks/useTelegram";
const Header = () => {
    const {tg} = useTelegram()

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <img src={tg.colorScheme === "light" ? "/assets/images/logo-black.png" : "/assets/images/logo-white.png"} alt=""/>
            </div>
            <h1>ARCADUM</h1>
            <div className={styles.__blank}></div>
        </div>
    );
};

export default Header;