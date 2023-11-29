import React, {FC, PropsWithChildren} from 'react';
import styles from "./ParamsBtn.module.scss"

interface ParamsBtn {
    isActive?: boolean
    onClick: () => void
}
const ParamsBtn:FC<PropsWithChildren<ParamsBtn>> = ({children, isActive}) => {
    return (
        <button className={`${isActive ? styles.active : ""}${styles.params}`}>
            {children}
        </button>
    );
};

export default ParamsBtn;