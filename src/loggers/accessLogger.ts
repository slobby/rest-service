import express from 'express';
import winston from 'winston';
import path from 'path';
// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
import { finished } from 'stream';
import { NODE_ENV, ACCESS_LOG_FILE, LOG_DIR } from '../common/config.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const SPACE = 4;
const isProdEnvironment = NODE_ENV === 'production';

const customLevels = { info: 3 };

const formatter = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, ...meta } = info;
    return JSON.stringify(
      {
        'remote-address': meta['remoteAddr'],
        time: timestamp,
        method: meta['method'],
        url: meta['url'],
        'http-version': meta['httpVersion'],
        'status-code': meta['statusCode'],
        'query-parameters': meta['query'],
        'req-params': meta['params'],
        body: meta['body'],
        'response-time': meta['responseTime'],
        'content-length': meta['contentLength'],
        'user-agent': meta['userAgent'],
      },
      null,
      SPACE
    );
  })
);

const prodTransport = new winston.transports.File({
  filename: path.join(__dirname, LOG_DIR, ACCESS_LOG_FILE),
  level: 'info',
  format: formatter,
});

const transport = new winston.transports.Console({
  format: winston.format.combine(formatter, winston.format.prettyPrint()),
});

const logger = winston.createLogger({
  levels: customLevels,
  transports: [prodTransport],
});

if (!isProdEnvironment) {
  logger.add(transport);
}

export const accessLogger = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const time = Date.now();
  next();
  finished(res, () => {
    const { httpVersion, method, url, query, params, body } = req;
    const remoteAddr = req.header('x-real-ip') || req.socket.remoteAddress;
    const userAgent = req.header('user-agent');
    const responseTime = Date.now() - time;
    const contentLength = res.get('content-length');
    const { statusCode } = res;
    logger.info('Recieved request', {
      remoteAddr,
      method,
      url,
      httpVersion,
      statusCode,
      query,
      params,
      body,
      responseTime,
      contentLength,
      userAgent,
    });
  });
};
