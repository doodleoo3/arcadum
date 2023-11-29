import React, {FC, useContext} from 'react';
import styles from "./Board.module.scss"
import {Cell as CellModel} from "../../cell/model/CellModel";
import Cell from "../../cell/ui/Cell";
import {Square} from "chess.js";
import {GameContext} from "../lib/context/GameContext";

interface BoardProps {
    board: CellModel[]
    makeMove: (pos: string) => void
    setFromPos: (pos: Square) => void
    selectedCell: Square | null
}
const Board:FC<BoardProps> = ({board, makeMove, setFromPos, selectedCell}) => {
    const { state }  = useContext(GameContext);

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const renderFileLabels = () => (
        <div className={styles.fileLabels}>
            {state.playerColor === "b"
                ?
                <>{files.reverse().map((file, index) => (
                    <div
                        key={file}
                        className={index % 2 === 0 ? styles.dark__file : ''}
                    >{file}</div>
                ))}</>
                :
                <>{files.map((file, index) => (
                    <div
                        key={file}
                        className={index % 2 === 0 ? styles.light__file : ''}
                    >{file}</div>
                ))}</>
            }
        </div>
    );

    const renderRankLabels = () => (
        <div className={styles.rankLabels}>
            {state.playerColor === "b"
                ?
                <>{ranks.map((rank, index) => (
                    <div
                        key={rank}
                        className={index % 2 === 0 ? styles.light__rank : ''}
                    >{rank}</div>
                ))}</>
                :
                <>{ranks.reverse().map((rank, index) => (
                    <div
                        key={rank}
                        className={index % 2 === 0 ? styles.dark__rank : ''}
                    >{rank}</div>
                ))}</>
            }
        </div>
    );


    return (
        <div className={styles.boardWrapper}>
            {renderRankLabels()}
            <div className={styles.board}>
                {board.map((cell, index) => (
                    <Cell cell={cell} index={index} key={cell.pos} makeMove={makeMove} setFromPos={setFromPos} selectedCell={selectedCell} />
                ))}
            </div>
            {renderFileLabels()}
        </div>
    );
};

export default Board;