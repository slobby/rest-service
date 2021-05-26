"use strict";
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
 * updateColumn type definition
 * @ignore
 * @typedef {Object} updateColumn Contains parameters for updating column instance
 * @property {string} id          Unique column id
 * @property {string} title       Column title
 * @property {number} order       Column order
 */
/**
 * Returns the list of all columns
 * @async
 * @returns {Promise<Array<Column>>} The list of all columns
 */
const getAll = async () => dataBase.columns;
/**
 * Find the column by Id
 * @async
 * @param {string} id The Id of column
 * @returns {Promise<Column|undefined>} The column if success, or undefinded otherwise
 */
const getById = async (id) => dataBase.columns.find((elment) => elment.id === id);
/**
 * Create the new column
 * @async
 * @param {createColumn} createColumn Parameters for creating column instance
 * @returns {Promise<Column>} Created column
 */
const create = async ({ title, order }) => {
    const column = new Column({ title, order });
    dataBase.columns.push(column);
    return column;
};
/**
 * Update the column
 * @param {updateColumn} updateColumn Parameters for update column instance
 * @returns {Promise<Column|undefined>} Updated column if success, or undefinded otherwise
 */
const update = async ({ id, title, order }) => {
    const findedColumnIndex = dataBase.columns.findIndex((elment) => elment.id === id);
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
 * Delete the column by Id
 * @param {string} id The Id of column
 * @returns {Promise<Column|undefined>} Deleted column if success, or undefinded otherwise
 */
const deletById = async (id) => {
    const findedColumnIndex = dataBase.columns.findIndex((elment) => elment.id === id);
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
