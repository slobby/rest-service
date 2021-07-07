import {
  Connection,
  getConnection,
  createConnection,
  ConnectionNotFoundError,
} from 'typeorm';

export const dbConnect = async (cb: CallableFunction): Promise<void> => {
  let connection: Connection;
  try {
    connection = getConnection();
    if (connection && !connection.isConnected) await connection.connect();
  } catch (error) {
    if (error instanceof ConnectionNotFoundError) {
      connection = await createConnection();
    } else {
      process.stdout.write(`Error while connect to database !!! ${error}`);
      process.exit(1);
    }
  }

  if (connection.isConnected) {
    process.stdout.write('Connect to database.\n');
    connection.close();
    cb();
  } else {
    process.stdout.write('Couldn`t connect to database !!!');
    process.exit(1);
  }
};
