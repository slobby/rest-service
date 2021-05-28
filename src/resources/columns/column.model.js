/**
 * Column model module
 * @module column-model
 */

const uuid = require('uuid').v4;

/**
 * createColumn type definition
 * @typedef {Object} createColumn Contains parameters for creating column instance
 * @property {string} [id]        Unique column id
 * @property {string} title       Column title
 * @property {number} order       Column order
 */

/** Class representing a column. */
class Column {
  /**
   * Create a column.
   * @param {createColumn} createColumn Parameters for creating column instance
   */
  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Return a representing of column for response
   * @static
   * @param {Column} column a column
   * @returns {Column} column`s parameters for responce
   */
  static toResponse(column) {
    return column;
  }
}

module.exports = Column;
