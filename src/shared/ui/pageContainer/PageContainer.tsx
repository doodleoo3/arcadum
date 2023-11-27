import React, {FC, PropsWithChildren} from 'react';
import styles from "./PageContainer.module.scss"
const PageContainer:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default PageContainer;