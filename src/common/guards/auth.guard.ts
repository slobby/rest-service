import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { IJWTPayload } from '../../models/login/interfaces/IJWTPayload';
import { UsersService } from '../../models/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { url } = request;
    const ignoreRouters: Array<string> = ['/login', '/doc'];
    const authScheme = 'Bearer';
    try {
      if (ignoreRouters.some((element: string) => url.startsWith(element))) {
        return true;
      }
      const authHeader = request.headers['authorization'];
      const JWT_SECRET_KEY = this.configService.get('JWT_SECRET_KEY', 'salt');
      if (authHeader && authHeader.startsWith(authScheme)) {
        const { id, login } = <IJWTPayload>(
          jwt.verify(authHeader.slice(7), JWT_SECRET_KEY)
        );
        const user = await this.usersService.getById(id);
        if (user && user.login === login) {
          return true;
        }
        throw new UnauthorizedException();
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
