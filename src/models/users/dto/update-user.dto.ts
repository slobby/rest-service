// import { IsString } from 'class-validator';
import { IUser } from '../interfaces/IUser';

export class UpdateUserDto implements Partial<IUser> {
  id?: string;

  name?: string;

  login?: string;

  password?: string;
}
