import express from 'express';
import createError from 'http-errors';
import StatusCodes from 'http-status-codes';
import { errorLogger } from './errorLogger.js';

export const errorHandler = (
  err: createError.HttpError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (res.headersSent) {
    next(err);
  }
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.send({
    error: {
      status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || 'Internal Server Error',
    },
  });
  errorLogger.error(err.message || 'Internal Server Error', err);
};
