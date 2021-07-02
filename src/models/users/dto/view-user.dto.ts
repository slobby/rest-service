import { IUser } from '../interfaces/IUser';

export class ViewUserDto implements Omit<IUser, 'password'> {
  id: string;

  name: string;

  login: string;
}
