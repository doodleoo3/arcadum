import React, {FC, useEffect, useRef} from 'react';
import styles from "./Sidebar.module.scss"
interface SidebarProps {
    moveHistory: Array<{ white: string, black: string | null }>
}
const Sidebar:FC<SidebarProps> = ({moveHistory}) => {
    const endOfListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfListRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [moveHistory]);

    return (
        <div className={styles.sidebar}>
            {moveHistory.map((move, index) => (
                <p key={index}>
                    <span>{index + 1}.</span> <span>{move.white}</span> <span>{move.black}</span>
                </p>
            ))}
            <div ref={endOfListRef} />
        </div>
    );
};

export default Sidebar;