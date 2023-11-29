import {Cell} from "../../cell/model/CellModel";
import {Color, Square} from "chess.js";

const range = (n: number) => {
    return Array.from({ length: n }, (_, i) => i + 1);
};

export const createBoard = (fenString: string, playerColor: Color) => {
    const fen = fenString.split(' ')[0];
    const fenPieces = fen.split('/').join('');

    let pieces: string[] = [];

    Array.from(fenPieces).forEach(item => {
        if (isFinite(Number(item))) {
            pieces.push(...Array(Number(item)).fill(''));
        } else {
            pieces.push(item);
        }
    });

    if (playerColor === "b") {
        pieces = pieces.reverse();
    }

    const rows = playerColor === "b" ? range(8).map((n) => n.toString()) : range(8).map((n) => n.toString()).reverse();

    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    if (playerColor === "b") {
        columns.reverse();
    }

    const cells: Square[] = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        for (let j = 0; j < columns.length; j++) {
            const col = columns[j];
            const square = `${col}${row}` as Square;
            cells.push(square);
        }
    }

    const board = [];
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const piece = pieces[i];
        board.push(new Cell(cell, piece));
    }

    return board;
}
