import React, {FC} from 'react';
import styles from "./PageContainer.module.scss"
const PageContainer:FC<React.PropsWithChildren> = ({children}) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    );
};

export default PageContainer;