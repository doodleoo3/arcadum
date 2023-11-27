import React, {FC, useContext} from 'react';
import {isLightSquare} from "../lib/isLightSquare";
import {Cell as CellModel} from "../model/CellModel";
import styles from "./Cell.module.scss"
import CellPiece from "../../cellPiece/ui/CellPiece";
import {Square} from "chess.js";
import {GameContext} from "../../board/lib/context/GameContext";
import {useTelegram} from "../../../../shared/lib/hooks/useTelegram";

interface CellProps {
    cell: CellModel
    index: number
    makeMove: (pos: string) => void
    setFromPos: (pos: Square ) => void
    selectedCell: Square | null
}
const Cell:FC<CellProps> = ({cell, index, setFromPos, makeMove}) => {
    const light = isLightSquare(cell.pos, index);

    const { state }  = useContext(GameContext);

    const isPossibleMove = state.possibleMoves.includes(cell.pos);

    const color = cell.piece.toUpperCase() === cell.piece ? 'w' : 'b';

    const inCheck = () => {
        const king = cell.piece.toUpperCase() === 'K';
        return state.turn === color && king && state.check;
    };

    const handleDrop = () => {
        makeMove(cell.pos);
    };

    const handleClick = () => {
        makeMove(cell.pos);
    };

    const {tg} = useTelegram()

    return (
        <div
            className={`${styles.cell} 
            ${tg.colorScheme === "light" 
                ? 
                light ? styles.dark : styles.light
                :
                light ? styles.light : styles.dark
            }`}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div
                className={`${styles.overlay} ${isPossibleMove ? styles.possible__move : ""} ${inCheck() && styles.check}`}
            >
                <CellPiece pos={cell.pos} name={cell.piece} setFromPos={setFromPos} />
            </div>
        </div>
    );
};

export default Cell;