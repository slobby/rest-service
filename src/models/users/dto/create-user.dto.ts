import { IsString } from 'class-validator';
import { IUser } from '../interfaces/IUser';

export class CreateUserDto implements Omit<IUser, 'id'> {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
