import React, {FC, PropsWithChildren} from 'react';
import styles from "./ParamsBtn.module.scss"

interface ParamsBtn {
    isActive?: boolean
    onClick: () => void
}
const ParamsBtn:FC<PropsWithChildren<ParamsBtn>> = ({children, isActive, onClick}) => {
    return (
        <button onClick={onClick} className={`${styles.params} ${isActive ? styles.active : ""}`}>
            {children}
        </button>
    );
};

export default ParamsBtn;