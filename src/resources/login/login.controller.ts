import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import StatusCodes from 'http-status-codes';
import loginService from './login.service.js';
import {
  loginReqBody,
  loginResBody,
} from '../../interfaces/loginInterfaces.js';

const getJWT = async (
  // eslint-disable-next-line @typescript-eslint/ban-types
  req: Request<{}, loginResBody, loginReqBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.body.login && req.body.password) {
      const token: string | undefined = await loginService.getJWT(req.body);
      if (token) {
        const resBody: loginResBody = { token };
        res.status(StatusCodes.OK).json(resBody);
      } else {
        throw new createError.Forbidden();
      }
    }
    throw new createError.BadRequest('Didn`t receive required parametres.');
  } catch (error) {
    next(error);
  }
};

export default { getJWT };
