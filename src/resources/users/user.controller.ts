import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import StatusCodes from 'http-status-codes';
import usersService from './user.service';
import { viewUser } from '../../interfaces/userInterfaces';

const getAll = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: Array<viewUser> = await usersService.getAll();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(new createError.NotFound('Not found users.'));
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, login, password } = req.body;
    if (!name || !login || !password) {
      throw new createError.BadRequest('Received not all fields for user.');
    }
    const user: viewUser | undefined = await usersService.create({
      name,
      login,
      password,
    });
    if (user) {
      res.status(StatusCodes.CREATED).json(user);
    } else {
      throw new createError.InternalServerError('Couldn`t create user.');
    }
  } catch (error) {
    next(error);
  }
};

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string | undefined = req.params['userId'];
    if (!id) {
      throw new createError.BadRequest('Don`t receive user id.');
    }
    const user: viewUser | undefined = await usersService.getById(id);
    if (user) {
      res.status(StatusCodes.OK).json(user);
    } else {
      throw new createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string | undefined = req.params['userId'];
    const { name, login, password } = req.body;
    if (!id || !name || !login || !password) {
      throw new createError.BadRequest('Received not all fields for user.');
    }
    const user: viewUser | undefined = await usersService.update({
      id,
      name,
      login,
      password,
    });
    if (user) {
      res.status(StatusCodes.OK).json(user);
    } else {
      throw new createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

const deletById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string | undefined = req.params['userId'];
    if (!id) {
      throw new createError.BadRequest('Don`t receive user id.');
    }
    const user: viewUser | undefined = await usersService.deletById(id);
    if (user) {
      res.status(StatusCodes.NO_CONTENT).json(user);
    } else {
      throw new createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

export default { getAll, create, getById, update, deletById };
