const createError = require('http-errors');
const {StatusCodes} = require('http-status-codes');
const usersService = require('./user.service');

const getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(createError.NotFound('Not found users.'));
  }
};

const create = async (req, res) => {
  const {name, login, password} = req.body;
  const user = await usersService.create({name, login, password});
  if (user) {
    res.status(StatusCodes.CREATED).json(user);
  }
  else {
  res.status(StatusCodes.BAD_REQUEST).send('Couldn`t create user.');
  }
};

const getById = async (req, res) => {
  const id = req.params.userId;
  const user = await usersService.getById(id);
  if (user) {
    res.status(StatusCodes.OK).json(user);
  }
  else {
  res.status(StatusCodes.NOT_FOUND).send('Not found.');
  }
};

const update = async (req, res) => {
  const id = req.params.userId;
  const { name, login, passowrd } = req.body;
  const user = await usersService.update({id, name, login, passowrd});
  if (user) {
    res.status(StatusCodes.OK).json(user);
  }
  else {
  res.status(StatusCodes.NOT_FOUND).send('Bad request.');
  }
};

const deletById = async (req, res) => {
  const id = req.params.userId;
  const user = await usersService.deletById(id);
  if (user) {
    res.status(StatusCodes.NO_CONTENT).json(user);
  }
  else {
  res.status(StatusCodes.NOT_FOUND).send('Not found.');
  }
};

module.exports = {getAll, create, getById, update, deletById};
