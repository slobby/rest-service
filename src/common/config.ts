import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;
export const AUTH_MODE: boolean = process.env['AUTH_MODE'] === 'true';
