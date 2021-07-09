import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CreateLoginDto } from './dto/create-login.dto';
import { IEnvironmentVariables } from '../../common/interfaces/IEnvironmentVariables';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { IJWTPayload } from './interfaces/IJWTPayload';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<IEnvironmentVariables>,
  ) {}

  async create(createLoginDto: CreateLoginDto): Promise<string | undefined> {
    const JWT_SECRET_KEY = this.configService.get<string>(
      'JWT_SECRET_KEY',
      'salt',
    );
    const user: User | undefined = await this.usersService.getByLoginParams(
      createLoginDto,
    );
    if (user) {
      const { id, login }: IJWTPayload = user;
      return jwt.sign({ id, login }, JWT_SECRET_KEY, {
        header: { alg: 'HS256', typ: 'JWT' },
      });
    }
    return undefined;
  }
}
