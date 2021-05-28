/**
 * Board model
 * @module board-model
 */

const uuid = require('uuid').v4;

/**
 * createBoard type definition
 * @global
 * @typedef {Object} createBoard      Contains parameters for creating board instance
 * @property {string} [id]            Unique board id
 * @property {string} title           Board title
 * @property {Array<Column>} columns  List of columns
 */

/**
 * updateBoard type definition
 * @global
 * @typedef {Object} updateBoard      Contains parameters for creating board instance
 * @property {string} id              Unique board id
 * @property {string} title           Board title
 * @property {Array<Column>} columns  List of columns
 */

/** Class representing a board.
 * @global
 */
class Board {
  /**
   * Creates a new a board instance.
   * @param {createBoard} createBoard Parameters for creating a new board instance
   */
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Returns a representing of board for response
   * @static
   * @memberof Board
   * @param {Board} board a board instance
   * @returns {Board} a board instance
   */
  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
