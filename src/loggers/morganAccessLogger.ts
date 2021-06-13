import fs from 'fs';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Request, Response } from 'express';
import { NODE_ENV, ACCESS_LOG_FILE, LOG_DIR } from '../common/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPACE = 2;

type Handler = (
  req: Request,
  res: Response,
  callback: (err?: Error) => void
) => void;

if (!fs.existsSync(path.join(__dirname, LOG_DIR))) {
  fs.mkdirSync(path.join(__dirname, LOG_DIR));
}

const getFormatter = (space?: number): morgan.FormatFn<Request, Response> => (
  tokens,
  req,
  res
) =>
  JSON.stringify(
    {
      'remote-address': tokens['remote-addr']?.(req, res),
      time: tokens['date']?.(req, res, 'iso'),
      method: tokens['method']?.(req, res),
      url: tokens['url']?.(req, res),
      'http-version': tokens['http-version']?.(req, res),
      'status-code': tokens['status']?.(req, res),
      'query-parameters': req.query,
      'req-params': req.params,
      body: req.body,
      'response-time': tokens['response-time']?.(req, res),
      'content-length': tokens['res']?.(req, res, 'content-length'),
      'user-agent': tokens['user-agent']?.(req, res),
    },
    null,
    space
  );

const getAccessLogger = (): Handler => {
  let result: Handler;
  if (NODE_ENV === 'production') {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, LOG_DIR, ACCESS_LOG_FILE),
      { flags: 'a', encoding: 'utf8' }
    );
    result = morgan(getFormatter(), {
      stream: accessLogStream,
    });
  } else {
    result = morgan(getFormatter(SPACE));
  }
  return result;
};

export const morganAccessLogger = getAccessLogger();
