import { hashSync } from 'bcryptjs';

export const hashPassword = (password: string): string =>
  hashSync(password, 10);
