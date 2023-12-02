import React, {FC, PropsWithChildren} from 'react';
import styles from "./LobbyContainer.module.scss"
const LobbyContainer:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default LobbyContainer;