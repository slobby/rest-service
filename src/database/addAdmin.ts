import { ConfigService } from '@nestjs/config';
import { UsersService } from '../models/users/users.service.js';

export const addAdmin = async (
  usersService: UsersService,
  configService: ConfigService,
): Promise<void> => {
  const name = configService.get('ADMIN_LOGIN', 'admin');
  const login = configService.get('ADMIN_LOGIN', 'admin');
  const password = configService.get('ADMIN_PASSWORD', 'admin');

  usersService.create({
    name,
    login,
    password,
  });
};
