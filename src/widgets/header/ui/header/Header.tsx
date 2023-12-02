import React from 'react';
import styles from "./Header.module.scss"
import {useTelegram} from "../../../../shared/lib/hooks/useTelegram";
const Header = () => {
    const {tg} = useTelegram()
    
    return (
        <div className={styles.header}>
            <img className={styles.logo} src={tg.colorScheme === "light" ? "/assets/images/logo-white.png" : "/assets/images/logo-dark.png"} alt=""/>
            <h1>ARCADUM</h1>
        </div>
    );
};

export default Header;