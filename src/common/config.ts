import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

declare const process: {
  env: {
    PORT: string;
    NODE_ENV: string;
    MONGO_CONNECTION_STRING: string;
    JWT_SECRET_KEY: string;
    AUTH_MODE: string;
  };
};

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;
export const AUTH_MODE: boolean = process.env.AUTH_MODE === 'true';
