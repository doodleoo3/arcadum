import React, {FC} from 'react';
import styles from "./GamePageContainer.module.scss"
const GamePageContainer:FC<React.PropsWithChildren> = ({children}) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    );
};

export default GamePageContainer;