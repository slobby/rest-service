import express from 'express';
import createError from 'http-errors';
import getLogger from './common/logger.js';
import swaggerUI from 'swagger-ui-express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(getLogger());

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
    next(createError(404, 'Not found'));
  }
);

app.use(
  (
    err: createError.HttpError,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
      }
    });
    if (!err) {
      next(err);
    }
  }
);

export default app;
