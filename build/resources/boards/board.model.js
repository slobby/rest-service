import { v4 as uuid } from 'uuid';
export class Board {
    constructor({ title = 'Board', columns = [] }) {
        this.id = uuid();
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
