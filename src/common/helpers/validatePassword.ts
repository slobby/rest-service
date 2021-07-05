import { compareSync } from 'bcryptjs';

export const validatePassword = (
  password: string,
  hashPassword: string,
): boolean => compareSync(password, hashPassword);
