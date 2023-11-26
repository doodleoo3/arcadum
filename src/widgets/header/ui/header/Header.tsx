import React from 'react';
import styles from "./Header.module.scss"
const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <h1>LOGO</h1>
            </div>
        </div>
    );
};

export default Header;