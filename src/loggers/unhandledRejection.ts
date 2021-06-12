import { finished } from 'stream';
import { errorLogger } from './errorLogger.js';

export const unhandledRejectionHandler = (
  error: Error,
  _promise: Promise<Error>
): void => {
  errorLogger.error('unhandledRejection', error);
  finished(errorLogger, () => {
    errorLogger.on('finish', () => process.exit(2));
    errorLogger.end();
  });
};
