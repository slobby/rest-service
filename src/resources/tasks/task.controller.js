const {StatusCodes} = require('http-status-codes');
const tasksService = require('./task.service');

const getAll = async (req, res) => {
  const {boardId} = req.params;
  const tasks = await tasksService.getAll(boardId);
  res.status(StatusCodes.OK).json(tasks);
};

const create = async (req, res) => {
  const {boardId} = req.params;
  const {title, order, description, userId, columnId} = req.body;
  const task = await tasksService.create({title, order, description, userId, boardId, columnId});
  if (task) {
    res.status(StatusCodes.CREATED).json(task);
  }
  else {
  res.status(StatusCodes.BAD_REQUEST).send('Couldn`t create task.');
  }
};

const getById = async (req, res) => {
  const {boardId, taskId:id} = req.params;
  const task = await tasksService.getById({boardId, id});
  if (task) {
    res.status(StatusCodes.OK).json(task);
  }
  else {
  res.status(StatusCodes.NOT_FOUND).send('Not found.');
  }
};

const update = async (req, res) => {
  const id = req.params.taskId;
  const { title=undefined, order=undefined, description=undefined, userId=null, boardId=null, columnId=null } = req.body;
  const task = await tasksService.update({id, title, order, description, userId, boardId, columnId});
  if (task) {
    res.status(StatusCodes.OK).json(task);
  }
  else {
  res.status(StatusCodes.NOT_FOUND).send('Bad request.');
  }
};

const deletById = async (req, res) => {
  const {boardId, taskId:id} = req.params;
  const task = await tasksService.deletById({boardId, id});
  if (task) {
    res.status(StatusCodes.NO_CONTENT).json(task);
  }
  else {
  res.status(StatusCodes.NOT_FOUND).send('Not found.');
  }
};

module.exports = {getAll, create, getById, update, deletById};
