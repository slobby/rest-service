import express from 'express';
import createError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import {
  accessLogger,
  errorHandler,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} from './loggers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(accessLogger);

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

app.use(errorHandler);

// /*Uncomment, to check uncaughtException*/
// throw Error('Oops! uncaughtException');

// /*Uncomment, to check unhandledRejection*/
// Promise.reject(Error('Oops! unhandledRejection'));

export default app;
