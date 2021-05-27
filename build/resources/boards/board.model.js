"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
class Board {
    constructor({ title = 'Board', columns = [] }) {
        this.id = uuid_1.v4();
        this.title = title;
        this.columns = columns;
    }
    /**
     * Return a representing of board for response
     * @static
     * @param {Board} board a board
     * @returns {Board} board`s parameters for responce
     */
    toResponse() {
        const viewboard = {
            id: this.id,
            title: this.title,
            columns: this.columns,
        };
        return viewboard;
    }
}
exports.Board = Board;
