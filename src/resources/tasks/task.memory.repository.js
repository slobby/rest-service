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
 * @property {number} userId          Task owner user userId
 * @property {number} boardId         Task owner board userId
 * @property {number} columnId        Task owner column userId
 */

/**
 * Returns the list of all tasks
 * @async
 * @returns {Promise<Array<Task>>} The list of all tasks
 */
const getAll = async (boardId) =>
  dataBase.tasks.filter((element) => element.boardId === boardId);

/**
 * Find the task by Id
 * @async
 * @param {string} id The Id of task
 * @returns {Promise<Task|undefined>} The task if success, or undefinded otherwise
 */
const getById = async ({ boardId, id }) =>
  dataBase.tasks.find(
    (elment) => elment.id === id && elment.boardId === boardId
  );

/**
 * Create the new task
 * @async
 * @param {createTask} createTask Parameters for creating task instance
 * @returns {Promise<Task>} Created task
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
 * Update the task
 * @param {createTask} updateTask Parameters for update task instance
 * @returns {Promise<Task|undefined>} Updated task if success, or undefinded otherwise
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
 * Delete the task by Id
 * @param {string} id The Id of task
 * @returns {Promise<Task|undefined>} Deleted task if success, or undefinded otherwise
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
