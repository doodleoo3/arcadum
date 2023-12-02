import React, {FC, PropsWithChildren} from 'react';
import styles from "./PageContainerItem.module.scss"
const PageContainerItem:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.item} style={{backgroundImage: 'url("/assets/images/blockbg.png")'}}>
            {children}
        </div>
    );
};

export default PageContainerItem;