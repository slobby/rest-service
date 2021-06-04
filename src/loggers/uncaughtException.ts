import { errorLogger } from './errorLogger.js';

export const uncaughtExceptionHandler = (error: Error) => {
  errorLogger.error('uncaughtException', error);
  errorLogger.on('finish', () => process.exit(1));
  errorLogger.end();
};
