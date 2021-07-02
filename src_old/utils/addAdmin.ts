import usersRepo from '../resources/users/user.repository.js';
import { ADMIN_LOGIN, ADMIN_PASSWORD } from '../common/config.js';

export const addAdmin = async (): Promise<void> => {
  usersRepo.create({
    name: ADMIN_LOGIN,
    login: ADMIN_LOGIN,
    password: ADMIN_PASSWORD,
  });
};
