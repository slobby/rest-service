import 'reflect-metadata';
import { PORT } from './common/config.js';
import { dbConnect } from './common/dbConnect.js';
import app from './app.js';

dbConnect(() => {
  app.listen(PORT, () =>
    process.stdout.write(`App is running on http://localhost:${PORT}\n`)
  );
});
