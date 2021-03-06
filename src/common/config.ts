import dotenv from 'dotenv';
import path from 'path';
// , { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

declare const process: {
  env: {
    PORT: string;
    NODE_ENV: string;
    JWT_SECRET_KEY: string;
    AUTH_MODE: string;
    ADMIN_LOGIN: string;
    ADMIN_PASSWORD: string;
  };
};

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const ACCESS_LOG_FILE = 'access.log';
export const ERROR_LOG_FILE = 'error.log';
export const LOG_DIR = '../../log';

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  ADMIN_LOGIN,
  ADMIN_PASSWORD,
} = process.env;
export const AUTH_MODE: boolean = process.env['AUTH_MODE'] === 'true';
