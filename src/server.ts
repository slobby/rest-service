import { PORT } from './common/config.js';

import app from './app.js';

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}\n`)
);
