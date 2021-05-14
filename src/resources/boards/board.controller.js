const boardsService = require('./board.service');

const getAll = async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards);
};

const create = async (req, res) => {
  const {title, columns} = req.body;
  const board = await boardsService.create({title, columns});
  if (board) {
    res.status(201).json(board);
  }
  else {
  res.status(400).send('Couldn`t create board.');
  }
};

const getById = async (req, res) => {
  const id = req.params.boardId;
  const board = await boardsService.getById(id);
  if (board) {
    res.status(200).json(board);
  }
  else {
  res.status(404).send('Not found.');
  }
};

const update = async (req, res) => {
  const id = req.params.boardId;
  const { title=undefined, columns=undefined } = req.body;
  const board = await boardsService.update({id, title, columns});
  if (board) {
    res.status(200).json(board);
  }
  else {
  res.status(404).send('Bad request.');
  }
};

const deletById = async (req, res) => {
  const id = req.params.boardId;
  const board = await boardsService.deletById(id);
  if (board) {
    res.status(204).json(board);
  }
  else {
  res.status(404).send('Not found.');
  }
};

module.exports = {getAll, create, getById, update, deletById};
