import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import StatusCodes from 'http-status-codes';
import boardsService from './board.service.js';
import { viewBoard } from '../../interfaces/boardInterfaces.js';

const getAll = async (
  _: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const boards: Array<viewBoard> = await boardsService.getAll();
    res.status(StatusCodes.OK).json(boards);
  } catch (error) {
    next(new createError.NotFound('Not found boards.'));
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, columns } = req.body;
    if (!title || !columns) {
      throw new createError.BadRequest('Received not all fields for board.');
    }
    const board: viewBoard | undefined = await boardsService.create({
      title,
      columns,
    });
    if (board) {
      res.status(StatusCodes.CREATED).json(board);
    } else {
      throw new createError.InternalServerError('Couldn`t create board.');
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
    const id = req.params['boardId'];
    if (!id) {
      throw new createError.BadRequest('Don`t receive board id.');
    }
    const board: viewBoard | undefined = await boardsService.getById(id);
    if (board) {
      res.status(StatusCodes.OK).json(board);
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
    const id = req.params['boardId'];
    const { title, columns } = req.body;
    if (!id || !title || !columns) {
      throw new createError.BadRequest('Received not all fields for board.');
    }
    const board: viewBoard | undefined = await boardsService.update({
      id,
      title,
      columns,
    });
    if (board) {
      res.status(StatusCodes.OK).json(board);
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
    const id = req.params['boardId'];
    if (!id) {
      throw new createError.BadRequest('Don`t receive board id.');
    }
    const board: viewBoard | undefined = await boardsService.deletById(id);
    if (board) {
      res.status(StatusCodes.NO_CONTENT).json(board);
    } else {
      throw new createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

export default { getAll, create, getById, update, deletById };
