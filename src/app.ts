import express from 'express';
import createError from 'http-errors';
import StatusCodes from 'http-status-codes';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import { accessLogger, errorLogger } from './loggers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on('unhandledRejection', (error: Error, _promise: Promise<any>) => {
  errorLogger.error('unhandledRejection', error);
  errorLogger.on('finish', () => process.exit(1));
  errorLogger.end();
});

process.on('uncaughtException', (error: Error) => {
  errorLogger.error('uncaughtException', error);
  errorLogger.on('finish', () => process.exit(2));
  errorLogger.end();
});

app.use(accessLogger);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    next(new createError.NotFound('Not found'));
  }
);

app.use(
  (
    err: createError.HttpError,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
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
  }
);

// /*Uncomment, to check uncaughtException*/
// throw Error('Oops! uncaughtException');

// /*Uncomment, to check unhandledRejection*/
// Promise.reject(Error('Oops! unhandledRejection'));

export default app;
