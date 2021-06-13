import { errorLogger } from './errorLogger.js';

export const unhandledRejectionHandler = (
  error: Error,
  _promise: Promise<Error>
): void => {
  errorLogger.error('unhandledRejection', error);
  errorLogger.on('finish', () => process.exit(2));
  errorLogger.end();
};
