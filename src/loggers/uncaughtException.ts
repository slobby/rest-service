import { finished } from 'stream';
import { errorLogger } from './errorLogger.js';

export const uncaughtExceptionHandler = (error: Error): void => {
  errorLogger.error('uncaughtException', error);
  finished(errorLogger, () => {
    errorLogger.on('finish', () => process.exit(1));
    errorLogger.end();
  });
};
