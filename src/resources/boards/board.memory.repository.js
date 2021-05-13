const dataBase = require("../db/db");
const Board = require('./board.model');
const ColumnRepo = require('../columns/column.memory.repository');

const getAll = async () => dataBase.boards;

const getById = async (id) => dataBase.boards.find((elment) => elment.id === id);

const create = async ({title, columns}) => {
  if (!Array.isArray(columns)) {
    return undefined;
  }
  const columnsToBoard = [];
  columns.forEach(async (element) =>
  columnsToBoard.push(await ColumnRepo.create({title : element.title, order : element.order})));
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
          const foundedColumn = ColumnRepo.getById(element.id);
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
          const newColumn = ColumnRepo.create({title : element.title, order : element.order});
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
    // переделать
    for (let i = dataBase.tasks.length-1; i >= 0 ; i -= 1) {
      if(dataBase.tasks[i].boardId === id) {
        dataBase.tasks.splice(i, 1);
      }
    }
  //
  dataBase.boards[findedBoardIndex].columns.forEach((element) => {
    ColumnRepo.deletById(element.id);
  })
  const deletedBoard = dataBase.boards.splice(findedBoardIndex, 1)
  return deletedBoard;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };