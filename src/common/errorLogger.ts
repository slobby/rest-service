import winston from 'winston';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { NODE_ENV, ERROR_LOG_FILE, LOG_DIR } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SPACE = 4;
const isProdEnvironment = NODE_ENV === 'production';

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
      Object.keys(meta).length ? JSON.stringify(meta, null, SPACE) : ''
    }`;
  })
);

const prodTransport = new winston.transports.File({
  filename: path.join(__dirname, LOG_DIR, ERROR_LOG_FILE),
  level: 'error',
  format: formatter,
});

const transport = new winston.transports.Console({
  format: formatter,
});

transport;

const getErrorLogger = (): winston.Logger => {
  winston.addColors(customLevels.colors);
  return winston.createLogger({
    levels: customLevels.levels,
    transports: [isProdEnvironment ? prodTransport : transport],
  });
};

export const errorLogger = getErrorLogger();
