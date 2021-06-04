import fs from 'fs';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { NODE_ENV, ACCESS_LOG_FILE, LOG_DIR } from './config.js';
import { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPACE = 2;

type Handler<Request, Response> = (
  req: Request,
  res: Response,
  callback: (err?: Error) => void
) => void;

const getFormatter = (space?: number): morgan.FormatFn<Request, Response> => {
  return (tokens, req, res) => {
    return JSON.stringify(
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
        referrer: tokens['referrer']?.(req, res),
        'user-agent': tokens['user-agent']?.(req, res),
      },
      null,
      space
    );
  };
};

const getAccessLogger = (): Handler<Request, Response> => {
  let result: Handler<Request, Response>;
  if (NODE_ENV === 'production') {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, LOG_DIR, ACCESS_LOG_FILE),
      { flags: 'a' }
    );
    result = morgan<Request, Response>(getFormatter(), {
      stream: accessLogStream,
    });
  } else {
    result = morgan<Request, Response>(getFormatter(SPACE));
  }
  return result;
};

export const accessLogger = getAccessLogger();
