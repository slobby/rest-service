import express from 'express';
import createError from 'http-errors';

import fs from 'fs';
import logger from 'morgan';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

if (app.get('env') === 'production') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../log/', 'access.log'),
    { flags: 'a' }
  );
  app.use(logger('combined', { stream: accessLogStream }));
} else {
  app.use(logger('dev'));
}

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
        message: err.message || 'Internal Server Error',
      },
    });
    if (!err) {
      next(err);
    }
  }
);

export default app;
