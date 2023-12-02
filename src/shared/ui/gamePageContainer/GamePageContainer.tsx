import React, {FC} from 'react';
import styles from "./GamePageContainer.module.scss"
import {useTelegram} from "../../lib/hooks/useTelegram";
const GamePageContainer:FC<React.PropsWithChildren> = ({children}) => {
    const {tg} = useTelegram()

    return (
        <section className={styles.container} style={tg.colorScheme === "light" ? {backgroundImage: `url("/assets/images/arcadum-bg-light.png")`} : {backgroundImage: `url("/assets/images/arcadum-bg-black.png")`}}>
            {children}
        </section>
    );
};

export default GamePageContainer;