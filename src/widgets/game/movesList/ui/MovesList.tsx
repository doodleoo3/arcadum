import React, {FC, useEffect, useRef} from 'react';
import styles from "./MovesList.module.scss"
interface SidebarProps {
    moveHistory: Array<{ white: string, black: string | null }>
}
const MovesList:FC<SidebarProps> = ({moveHistory}) => {
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.scrollLeft = sidebarRef.current.scrollWidth;
        }
    }, [moveHistory]);

    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            {moveHistory.map((move, index) => (
                <p key={index}>
                    <span>{index + 1}.</span> <span>{move.white}</span> <span>{move.black}</span>
                </p>
            ))}
        </div>
    );
};

export default MovesList;