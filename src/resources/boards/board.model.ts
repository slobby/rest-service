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

/** Class representing a board.
 * @global
 */
class Board {
  /**
   * Create a board.
   * @param {createBoard} createBoard Parameters for creating board instance
   */
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return a representing of board for response
   * @static
   * @param {Board} board a board
   * @returns {Board} board`s parameters for responce
   */
  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
