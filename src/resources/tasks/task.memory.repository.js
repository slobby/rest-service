const dataBase = require("../db/db");
const Task = require('./task.model');

const getAll = async (boardId) => dataBase.tasks.filter((element) =>
  element.boardId === boardId
);

const getById = async ({boardId, id}) => dataBase.tasks.find((elment) => 
   elment.id === id && elment.boardId === boardId
);

const create = async ({title, order, description, userId, boardId, columnId}) => {
  const task = new Task({title, order, description, userId, boardId, columnId});
  dataBase.tasks.push(task);
  return task;
};

const update = async ({id, title, order, description, userId, boardId, columnId}) => {
  const findedTaskIndex = dataBase.tasks.findIndex((elment) => elment.id === id);
  if (findedTaskIndex !== -1) {
    const updatedTask = {...dataBase.tasks[findedTaskIndex],
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    }
    dataBase.tasks.splice(findedTaskIndex, 1, updatedTask)
    return dataBase.tasks[findedTaskIndex];
  }
  return undefined;
};

const deletById = async ({boardId, id}) => {
  const findedTaskIndex = dataBase.tasks.findIndex((elment) =>
  elment.id === id && elment.boardId === boardId);
  if (findedTaskIndex !== -1) {
  const deletedTask = dataBase.tasks.splice(findedTaskIndex, 1)
  return deletedTask;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };