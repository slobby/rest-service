/**
 * Column repository module
 * @module column-repository
 */

const dataBase = require('../db/db');
const Column = require('./column.model');

/**
 * createColumn type definition
 * @ignore
 * @typedef {Object} createColumn Contains parameters for creating column instance
 * @property {string} [id]        Unique column id
 * @property {string} title       Column title
 * @property {number} order       Column order
 */

/**
 * Returns Promise with the list of all columns instances from DataBase
 * @async
 * @returns {Promise<Array<Column>>} Promise with the list of all columns instances
 */
const getAll = async () => dataBase.columns;

/**
 * Returns Promise with the column instance found by its Id
 * @async
 * @param {string} id The Id of column
 * @returns {Promise<Column|undefined>} Promise with the found column instance if success, or undefinded otherwise
 */
const getById = async (id) =>
  dataBase.columns.find((elment) => elment.id === id);

/**
 * Returns Promise with the new column instance, created from input parameters
 * @async
 * @param {createColumn} createColumn Parameters for creating column instance
 * @returns {Promise<Column>} Promise with the new column instance
 */
const create = async ({ title, order }) => {
  const column = new Column({ title, order });
  dataBase.columns.push(column);
  return column;
};

/**
 * Returns Promise with the updated column instance
 * @param {updateColumn} updateColumn Parameters for update column instance
 * @returns {Promise<Column|undefined>} Promise with the updated column instance if success, or undefinded otherwise
 */
const update = async ({ id, title, order }) => {
  const findedColumnIndex = dataBase.columns.findIndex(
    (elment) => elment.id === id
  );
  if (findedColumnIndex !== -1) {
    const updatedColumn = {
      ...dataBase.columns[findedColumnIndex],
      title,
      order,
    };
    dataBase.columns.splice(findedColumnIndex, 1, updatedColumn);
    return updatedColumn;
  }
  return undefined;
};

/**
 * Returns Promise with deleted column instance by Id
 * @param {string} id The Id of column
 * @returns {Promise<Column|undefined>} Promise with deleted column instance if success, or undefinded otherwise
 */
const deletById = async (id) => {
  const findedColumnIndex = dataBase.columns.findIndex(
    (elment) => elment.id === id
  );
  if (findedColumnIndex !== -1) {
    dataBase.tasks.forEach((element) => {
      const localElement = element;
      if (localElement.columnId === id) {
        localElement.columnId = null;
      }
    });
    const deletedColumn = dataBase.columns.splice(findedColumnIndex, 1);
    return deletedColumn;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };
