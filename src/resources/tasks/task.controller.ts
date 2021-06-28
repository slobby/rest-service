import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import StatusCodes from 'http-status-codes';
import tasksService from './task.service.js';
import { viewTask } from '../../interfaces/taskInterfaces.js';

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      throw new createError.BadRequest('Don`t receive board id.');
    }
    const tasks: Array<viewTask> = await tasksService.getAll(boardId);
    res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    next(new createError.NotFound('Not found tasks.'));
  }
};

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      throw new createError.BadRequest('Don`t receive board id.');
    }
    const {
      title,
      order,
      description,
      userId = null,
      columnId = null,
    } = req.body;
    // Disgusting tests
    if (!title) {
      throw new createError.BadRequest('Received not all fields for task.');
    }
    const task: viewTask | undefined = await tasksService.create({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    if (task) {
      res.status(StatusCodes.CREATED).json(task);
    } else {
      throw new createError.InternalServerError('Couldn`t create task.');
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
    const { boardId, taskId: id } = req.params;
    if (!boardId || !id) {
      throw new createError.BadRequest('Don`t receive board id or task id.');
    }
    const task: viewTask | undefined = await tasksService.getById({
      boardId,
      id,
    });
    if (task) {
      res.status(StatusCodes.OK).json(task);
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
    const id = req.params['taskId'];
    const {
      title,
      order,
      description,
      userId = null,
      boardId = null,
      columnId = null,
    } = req.body;
    // Disgusting tests
    if (!id) {
      throw new createError.BadRequest('Received not all fields for task.');
    }
    const task: viewTask | undefined = await tasksService.update({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    if (task) {
      res.status(StatusCodes.OK).json(task);
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
    const { boardId, taskId: id } = req.params;
    if (!boardId || !id) {
      throw new createError.BadRequest('Don`t receive board id or task id.');
    }
    const task = await tasksService.deletById({ boardId, id });
    if (task) {
      res.status(StatusCodes.NO_CONTENT).json(task);
    } else {
      throw new createError.NotFound('Not found.');
    }
  } catch (error) {
    next(error);
  }
};

export default { getAll, create, getById, update, deletById };
