import React, {FC, useRef} from 'react';
import styles from "./CellPiece.module.scss"
import {Square} from "chess.js";
interface CellPieceProps {
    name: string
    pos: Square
    setFromPos: (pos: Square) => void
    isPossibleMove: boolean
}
const CellPiece:FC<CellPieceProps> = ({name, pos, setFromPos, isPossibleMove}) => {
    const color = name === name.toUpperCase() ? 'w' : 'b';
    const imageName = `${color}${name.toUpperCase()}`;
    const element = useRef<HTMLImageElement>(null);

    let image;

    try {
        image = require(`../lib/assets/images/${imageName}.png`);
    } catch (error) {
        image = null;
    }

    const handleDragStart = () => {
        setFromPos(pos);
        setTimeout(() => {
            if (element.current) {
                element.current.style.display = 'none';
            }
        }, 0);
    };

    const handleDragEnd = () => {
        if (element.current) {
            element.current.style.display = 'block';
        }
    };

    const handleClick = () => {
        setFromPos(pos);
    }

    return (
        <div
            className={styles.piece}
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}
            ref={element}
            draggable={true}
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            {isPossibleMove && <div className={styles.possible__move}></div>}
        </div>
    );
};

export default CellPiece;