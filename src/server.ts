import { PORT } from './common/config';

import app from './app';

app.listen(PORT, () =>
  process.stdout.write(`App is running on http://localhost:${PORT}`)
);
