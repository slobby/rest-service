import { finished } from 'stream';
import { errorLogger } from './errorLogger.js';

export const unhandledRejectionHandler = (
  error: Error,
  _promise: Promise<Error>
): void => {
  errorLogger.error('unhandledRejection', error);
  finished(errorLogger, () => {
    errorLogger.end();
    process.exit(2);
  });
};
