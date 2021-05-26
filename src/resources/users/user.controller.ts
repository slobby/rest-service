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

const create = async (req, res, next) => {
  try {
    const {name, login, password} = req.body;
    if (!name || !login || !password) {
      throw createError.BadRequest('Received not all fields for user.');
    }
    const user = await usersService.create({name, login, password});
    if (user) {
      res.status(StatusCodes.CREATED).json(user);
    }
    else {
      throw createError.InternalServerError('Couldn`t create user.');
    }
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.userId;
    if (!id) {
      throw createError.BadRequest('Don`t receive user id.');
    }
    const user = await usersService.getById(id);
    if (user) {
      res.status(StatusCodes.OK).json(user);
    }
    else {
      throw createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const { name, login, password } = req.body;
    if (!id || !name || !login || !password ) {
      throw createError.BadRequest('Received not all fields for user.');
    }
    const user = await usersService.update({id, name, login, password});
    if (user) {
      res.status(StatusCodes.OK).json(user);
    }
    else {
      throw createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

const deletById = async (req, res,next) => {
  try {
    const id = req.params.userId;
    if (!id) {
      throw createError.BadRequest('Don`t receive user id.');
    }
    const user = await usersService.deletById(id);
    if (user) {
      res.status(StatusCodes.NO_CONTENT).json(user);
    }
    else {
      throw createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {getAll, create, getById, update, deletById};
