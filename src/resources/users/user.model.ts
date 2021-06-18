import { v4 as uuid } from 'uuid';
import { viewUser } from '../../interfaces/userInterfaces.js';
import { IModel } from '../../interfaces/interfaces.js';

export class User implements IModel<viewUser> {
  id: string;

  name: string;

  login: string;

  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  toResponse(): viewUser {
    const viewuser: viewUser = {
      id: this.id,
      name: this.name,
      login: this.login,
    };
    return viewuser;
  }
}
