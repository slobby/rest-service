import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const ACCESS_LOG_FILE = 'access.log';
export const ERROR_LOG_FILE = 'error.log';
export const LOG_DIR = '../../../log';

export const { NODE_ENV } = process.env;

const customLevels = {
  levels: {
    info: 3,
    warn: 2,
    error: 1,
  },
  colors: {
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};

const formatter = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 4) : ''
    }`;
  }),
);

const prodTransport = new winston.transports.File({
  filename: path.join(__dirname, LOG_DIR, ERROR_LOG_FILE),
  level: 'error',
  format: formatter,
});

const transport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({
      colors: customLevels.colors,
    }),
    formatter,
  ),
});

export const errorLoggerOptions = {
  levels: customLevels.levels,
  transports: [prodTransport, transport],
};
