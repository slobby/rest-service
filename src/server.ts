import 'reflect-metadata';
import { PORT } from './common/config.js';
import { dbConnect } from './common/dbConnect.js';
import app from './app.js';
import { addAdmin } from './utils/addAdmin.js';

dbConnect(() => {
  addAdmin();
  app.listen(PORT, () =>
    process.stdout.write(`App is running on http://localhost:${PORT}\n`)
  );
});
