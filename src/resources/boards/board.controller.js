const boardsService = require('./board.service');
const statusCodes = require('../../common/constants');

const getAll = async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(statusCodes.OK).json(boards);
};

const create = async (req, res) => {
  const {title, columns} = req.body;
  const board = await boardsService.create({title, columns});
  if (board) {
    res.status(statusCodes.CREATED).json(board);
  }
  else {
  res.status(statusCodes.BAD_REQUEST).send('Couldn`t create board.');
  }
};

const getById = async (req, res) => {
  const id = req.params.boardId;
  const board = await boardsService.getById(id);
  if (board) {
    res.status(statusCodes.OK).json(board);
  }
  else {
  res.status(statusCodes.NOT_FOUND).send('Not found.');
  }
};

const update = async (req, res) => {
  const id = req.params.boardId;
  const { title=undefined, columns=undefined } = req.body;
  const board = await boardsService.update({id, title, columns});
  if (board) {
    res.status(statusCodes.OK).json(board);
  }
  else {
  res.status(statusCodes.NOT_FOUND).send('Bad request.');
  }
};

const deletById = async (req, res) => {
  const id = req.params.boardId;
  const board = await boardsService.deletById(id);
  if (board) {
    res.status(statusCodes.NO_CONTENT).json(board);
  }
  else {
  res.status(statusCodes.NOT_FOUND).send('Not found.');
  }
};

module.exports = {getAll, create, getById, update, deletById};
