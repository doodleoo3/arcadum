import React, {FC} from 'react';
import styles from "./Sidebar.module.scss"
interface SidebarProps {
    moveHistory: Array<{ white: string, black: string | null }>
}
const Sidebar:FC<SidebarProps> = ({moveHistory}) => {
    return (
        <div className={styles.sidebar}>
            {moveHistory.map((move, index) => (
                <p key={index}>
                    <span>{index + 1}.</span> <span>{move.white}</span> <span>{move.black}</span>
                </p>
            ))}
        </div>
    );
};

export default Sidebar;