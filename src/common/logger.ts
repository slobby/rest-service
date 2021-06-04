import fs from 'fs';
import morgan from 'morgan';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { NODE_ENV } from './config.js';
import { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOG_FILE = 'access.log';
const SPACE = '   ';

type Handler<Request, Response> = (req: Request, res: Response, callback: (err?: Error) => void) => void;

morgan.token('query-parameters', (req: Request, _res: Response): string => {
  return JSON.stringify(req.query);
});

morgan.token('req-params', (req: Request, _res: Response): string => {
  return JSON.stringify(req.params);
});

morgan.token('body', (req: Request, _res: Response): string => {
  return JSON.stringify(req.body);
});

const getFormatter = (space?: string): morgan.FormatFn<Request, Response> => {
  return (tokens, req, res) => {
    return JSON.stringify({
        'remote-address': tokens['remote-addr']?.(req, res),
        'time': tokens['date']?.(req, res, 'iso'),
        'method': tokens['method']?.(req, res),
        'url': tokens['url']?.(req, res),
        'http-version': tokens['http-version']?.(req, res),
        'status-code': tokens['status']?.(req, res),
        'query-parameters': req.query,
        'req-params':  req.params,
        'body': req.body,
        'response-time': tokens['response-time']?.(req, res),
        'content-length': tokens['res']?.(req, res, 'content-length'),
        'referrer': tokens['referrer']?.(req, res),
        'user-agent': tokens['user-agent']?.(req, res)
    }, null, space);
  }
}

export default (): Handler<Request, Response> => {
  let result: Handler<Request, Response>;
  if (NODE_ENV === 'production') {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, '../log/', LOG_FILE),
      { flags: 'a' }
    );
    result = morgan<Request, Response>(getFormatter(), { stream: accessLogStream } );
  } else {
    result = morgan<Request, Response>(getFormatter(SPACE));
  }
  return result;
}
