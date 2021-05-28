/**
 * Board repository module
 * @module board-repository
 */

const dataBase = require('../db/db');
const Board = require('./board.model');
const Column = require('../columns/column.model');
const columnsRepo = require('../columns/column.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

/**
 * createBoard type definition
 * @typedef {Object} createBoard      Contains parameters for creating board instance
 * @property {string} [id]            Unique board id
 * @property {string} title           Board title
 * @property {Array<Column>} columns  List of columns
 */

/**
 * updateBoard type definition
 * @typedef {Object} updateBoard      Contains parameters for creating board instance
 * @property {string} id              Unique board id
 * @property {string} title           Board title
 * @property {Array<Column>} columns  List of columns
 */

/**
 * Returns the list of all boards
 * @async
 * @returns {Promise<Array<Board>>} The list of all boards
 */
const getAll = async () => dataBase.boards;

/**
 * Find the board by Id
 * @async
 * @param {string} id The Id of board
 * @returns {Promise<Board>|undefined} The board if success, or undefinded otherwise
 */
const getById = async (id) =>
  dataBase.boards.find((elment) => elment.id === id);

/**
 * Create the board
 * @async
 * @param {createBoard} createColumn Parameters for creating board instance
 * @returns {Promise<Board>} Created board
 */
const create = async ({ title, columns }) => {
  if (!Array.isArray(columns)) {
    return undefined;
  }
  const columnsToBoard = [];
  columns.forEach(async (element) =>
    columnsToBoard.push(
      await columnsRepo.create({ title: element.title, order: element.order })
    )
  );
  const board = new Board({ title, columns: columnsToBoard });
  dataBase.boards.push(board);
  return board;
};

/**
 * Update the board
 * @param {updateBoard} updateColumn Parameters for update board instance
 * @returns {Promise<Board|undefined>} Updated board if success, or undefinded otherwise
 */
const update = async ({ id, title, columns }) => {
  const findedBoardIndex = dataBase.boards.findIndex(
    (elment) => elment.id === id
  );
  if (findedBoardIndex !== -1) {
    if (title) {
      dataBase.boards[findedBoardIndex].title = title;
    }
    if (columns && Array.isArray(columns)) {
      columns.forEach((element) => {
        if (element.id) {
          const foundedColumn = columnsRepo.getById(element.id);
          if (foundedColumn && foundedColumn instanceof Column) {
            if (element.title) {
              foundedColumn.title = element.title;
            }
            if (element.order) {
              foundedColumn.order = element.order;
            }
          }
        } else {
          const newColumn = columnsRepo.create({
            title: element.title,
            order: element.order,
          });
          dataBase.boards[findedBoardIndex].columns.push(newColumn);
        }
      });
    }
    return dataBase.boards[findedBoardIndex];
  }
  return undefined;
};

/**
 * Delete the board by Id
 * @param {string} id The Id of board
 * @returns {Promise<Board|undefined>} Deleted board if success, or undefinded otherwise
 */
const deletById = async (id) => {
  const findedBoardIndex = dataBase.boards.findIndex(
    (elment) => elment.id === id
  );
  if (findedBoardIndex !== -1) {
    dataBase.boards[findedBoardIndex].columns.forEach((element) => {
      columnsRepo.deletById(element.id);
    });
    const tasksIdForBoard = (await tasksRepo.getAll(id)).map(
      (element) => element.id
    );
    if (tasksIdForBoard) {
      tasksIdForBoard.forEach(async (element) => {
        await tasksRepo.deletById({ boardId: id, id: element });
      });
    }
    const deletedBoard = dataBase.boards.splice(findedBoardIndex, 1);
    return deletedBoard;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };
