const dataBase = require("../db/db");
// const tasksRepo = require('../tasks/task.memory.repository');
const Column = require('./column.model');

const getAll = async () => dataBase.columns;

const getById = async (id) => dataBase.columns.find((elment) => elment.id === id);

const create = async ({title , order}) => {
  const column = new Column({title, order});
  dataBase.columns.push(column);
  return column;
};

const update = async ({id, title , order}) => {
  const findedColumnIndex = dataBase.columns.findIndex((elment) => elment.id === id);
  if (findedColumnIndex !== -1) {
  const updatedColumn = {...dataBase.columns[findedColumnIndex], title , order};
  dataBase.columns.splice(findedColumnIndex, 1, updatedColumn);
  return updatedColumn;
  }
  return undefined;
};

const deletById = async (id) => {
  const findedColumnIndex = dataBase.columns.findIndex((elment) => elment.id === id);
  if (findedColumnIndex !== -1) {
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["element"] }] */
  // переписать
  dataBase.tasks.forEach((element) => {
    if (element.columnId === id) {
      element.columnId = null;
    }
  });
  // переписать
  const deletedColumn = dataBase.columns.splice(findedColumnIndex, 1)
  return deletedColumn;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };