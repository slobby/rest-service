/**
 * Task repository module
 * @module task-repository
 */

const dataBase = require('../db/db');
const Task = require('./task.model');

/**
 * createTask type definition
 * @ignore
 * @typedef {Object} createTask       Contains parameters for creating task instance
 * @property {string} [id]            Unique task id
 * @property {string} title           Task title
 * @property {string} order           Task order
 * @property {string} description     Task description
 * @property {string|null} userId     Task owner user userId
 * @property {string|null} boardId    Task owner board userId
 * @property {string|null} columnId   Task owner column userId
 */

/**
 * Returns Promise with the list of all tasks instances for board with 'boardId' from DataBase
 * @async
 * @param {string} boardId The Id of board
 * @returns {Promise<Array<Task>>} Promise with the list of all tasks instances for board with 'boardId'
 */
const getAll = async (boardId) =>
  dataBase.tasks.filter((element) => element.boardId === boardId);

/**
 * Returns Promise with the task instance found by its Id
 * @async
 * @param {boardTaskId} boardtaskId Parameters for searching task, contains unique task id and board id
 * @returns {Promise<Task|undefined>} Promise with the found task instance if success, or undefinded otherwise
 */
const getById = async ({ boardId, id }) =>
  dataBase.tasks.find(
    (elment) => elment.id === id && elment.boardId === boardId
  );

/**
 * Promise with the new task instance, created from input parameters
 * @async
 * @param {createTask} createTask Parameters for creating task instance
 * @returns {Promise<Task>} Promise with the new task instance
 */
const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  dataBase.tasks.push(task);
  return task;
};

/**
 * Returns Promise with the updated task instance
 * @param {createTask} updateTask Parameters for update task instance
 * @returns {Promise<Task|undefined>} Promise with the updated task instance if success, or undefinded otherwise
 */
const update = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}) => {
  const findedTaskIndex = dataBase.tasks.findIndex(
    (elment) => elment.id === id
  );
  if (findedTaskIndex !== -1) {
    const updatedTask = {
      ...dataBase.tasks[findedTaskIndex],
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
    dataBase.tasks.splice(findedTaskIndex, 1, updatedTask);
    return dataBase.tasks[findedTaskIndex];
  }
  return undefined;
};

/**
 * Returns Promise with deleted task instance by Id
 * @param {boardTaskId} boardtaskId Parameters for searching task, contains unique task id and board id
 * @returns {Promise<Task|undefined>} Promise with deleted task instance if success, or undefinded otherwise
 */
const deletById = async ({ boardId, id }) => {
  const findedTaskIndex = dataBase.tasks.findIndex(
    (elment) => elment.id === id && elment.boardId === boardId
  );
  if (findedTaskIndex !== -1) {
    const deletedTask = dataBase.tasks.splice(findedTaskIndex, 1);
    return deletedTask;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };
