import {
  Connection,
  getConnection,
  createConnection,
  ConnectionNotFoundError,
} from 'typeorm';
import { errorLogger } from '../loggers/errorLogger.js';

export const dbConnect = async (cb: CallableFunction): Promise<void> => {
  let connection: Connection;
  try {
    connection = getConnection();
    if (connection && !connection.isConnected) await connection.connect();
  } catch (error) {
    if (error instanceof ConnectionNotFoundError) {
      connection = await createConnection();
    } else {
      errorLogger.error(`Error while connect to database !!! ${error}`);
      process.exit(1);
    }
  }

  if (connection.isConnected) {
    // connection.runMigrations();
    errorLogger.info('Connect to database.\n');
    cb();
  } else {
    errorLogger.error('Couldn`t connect to database !!!');
    process.exit(1);
  }
};
