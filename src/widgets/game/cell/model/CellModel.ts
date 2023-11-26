import {Square} from "chess.js";

export class Cell {
    pos: Square
    piece: string

    constructor(pos: Square, piece: string) {
        this.pos = pos;
        this.piece = piece;
    }
}