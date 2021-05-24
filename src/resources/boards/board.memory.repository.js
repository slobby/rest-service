const dataBase = require("../db/db");
const Board = require('./board.model');
const columnsRepo = require('../columns/column.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => dataBase.boards;

const getById = async (id) => dataBase.boards.find((elment) => elment.id === id);

const create = async ({title, columns}) => {
  if (!Array.isArray(columns)) {
    return undefined;
  }
  const columnsToBoard = [];
  columns.forEach(async (element) =>
  columnsToBoard.push(await columnsRepo.create({title : element.title, order : element.order})));
  const board = new Board({title, columns : columnsToBoard});
  dataBase.boards.push(board);
  return board;
};

const update = async ({id, title, columns}) => {
  const findedBoardIndex = dataBase.boards.findIndex((elment) => elment.id === id);
  if (findedBoardIndex !== -1) {
    if (title) {
      dataBase.boards[findedBoardIndex].title = title;
    };
    if (columns && Array.isArray(columns)) {
      columns.forEach((element) => {
        if (element.id) {
          const foundedColumn = columnsRepo.getById(element.id);
          if (foundedColumn) {
            if (element.title) {
              foundedColumn.title = element.title;
            }
            if (element.order) {
              foundedColumn.order = element.order;
            }
          }
        }
        else {
          const newColumn = columnsRepo.create({title : element.title, order : element.order});
          dataBase.boards[findedBoardIndex].columns.push(newColumn);
        }
      });
    }
    return dataBase.boards[findedBoardIndex];
    }
  return undefined;
};

const deletById = async (id) => {
  const findedBoardIndex = dataBase.boards.findIndex((elment) => elment.id === id);
  if (findedBoardIndex !== -1) {
    dataBase.boards[findedBoardIndex].columns.forEach((element) => {
      columnsRepo.deletById(element.id);
    });
    const tasksIdForBoard = (await tasksRepo.getAll(id)).map((element) => element.id);
    if (tasksIdForBoard) {
      tasksIdForBoard.forEach(async (element) => {
        await tasksRepo.deletById({boardId : id, id : element});});
      }
  const deletedBoard = dataBase.boards.splice(findedBoardIndex, 1);
  return deletedBoard;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };