import dotenv from 'dotenv';
import path from 'path';
import winston from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance,
} from 'winston/lib/winston/transports';

declare const process: {
  env: {
    NODE_ENV: string;
    RETRY_ATTEMPTS: number;
    RETRY_DELAY: number;
    USE_FASTIFY: string;
  };
};

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

export const ERROR_LOG_FILE = 'log.log';
export const LOG_DIR = '../../../log';

export const { NODE_ENV, RETRY_ATTEMPTS, RETRY_DELAY } = process.env;
export const USE_FASTIFY: boolean = process.env['USE_FASTIFY'] === 'true';

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
  level: 'info',
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

const transports: Array<ConsoleTransportInstance | FileTransportInstance> = [
  prodTransport,
];
if (NODE_ENV === 'development') {
  transports.push(transport);
}

export const errorLoggerOptions = {
  levels: customLevels.levels,
  transports,
};
