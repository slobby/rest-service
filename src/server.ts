import { PORT } from './common/config.js';
import app from './app.js';
import { errorLogger } from './common/errorLogger.js';

app.listen(PORT, () =>
  errorLogger.info(`App is running on http://localhost:${PORT}\n`)
);
