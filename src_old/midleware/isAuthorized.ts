import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import createError from 'http-errors';
import { JWT_SECRET_KEY } from '../common/config.js';
import { JWTPayload } from '../interfaces/loginInterfaces.js';
import usersRepo from '../resources/users/user.repository.js';

export const isAuthorized = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { url } = req;
  const ignoreRouters: Array<string> = ['/login', '/doc'];
  const authScheme = 'Bearer';
  try {
    if (ignoreRouters.some((element: string) => url.startsWith(element))) {
      next();
    } else {
      const authHeader = req.header('Authorization');
      if (authHeader && authHeader.startsWith(authScheme)) {
        const { id, login } = <JWTPayload>(
          jwt.verify(authHeader.slice(7), JWT_SECRET_KEY)
        );
        const user = await usersRepo.getById(id);
        if (user && user.login === login) {
          next();
        } else {
          throw new createError.Unauthorized('Bad token');
        }
      } else {
        throw new createError.Unauthorized('Didn`t receive required header.');
      }
    }
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      next(new createError.Unauthorized('Bad token'));
    } else {
      next(error);
    }
  }
};
