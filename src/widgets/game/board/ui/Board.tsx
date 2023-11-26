import React, {FC} from 'react';
import styles from "./Board.module.scss"
import {Cell as CellModel} from "../../cell/model/CellModel";
import Cell from "../../cell/ui/Cell";
import {Square} from "chess.js";

interface BoardProps {
    board: CellModel[]
    makeMove: (pos: string) => void
    setFromPos: (pos: Square) => void
    selectedCell: Square | null
}
const Board:FC<BoardProps> = ({board, makeMove, setFromPos, selectedCell}) => {

    return (
        <div className={styles.board}>
            {board.map((cell, index) => (
                <Cell cell={cell} index={index} key={cell.pos} makeMove={makeMove} setFromPos={setFromPos} selectedCell={selectedCell} />
            ))}
        </div>
    );
};

export default Board;