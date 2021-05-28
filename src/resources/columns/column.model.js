/**
 * Column model module
 * @module column-model
 */

const uuid = require('uuid').v4;

/**
 * createColumn type definition
 * @global
 * @typedef {Object} createColumn Contains parameters for creating column instance
 * @property {string} [id]        Unique column id
 * @property {string} title       Column title
 * @property {number} order       Column order
 */

/**
 * updateColumn type definition
 * @global
 * @typedef {Object} updateColumn Contains parameters for updating column instance
 * @property {string} id          Unique column id
 * @property {string} title       Column title
 * @property {number} order       Column order
 */

/** Class representing a column.
 * @global
 */
class Column {
  /**
   * Creates a new column instance.
   * @param {createColumn} createColumn Parameters for creating a new column instance
   */
  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Returns a representing of column for response
   * @static
   * @memberof Column
   * @param {Column} column a column instance
   * @returns {Column} a column instance
   */
  static toResponse(column) {
    return column;
  }
}

module.exports = Column;
