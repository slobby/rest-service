import { dataBase } from '../db/db';
import { User } from './user.model';
import { Task } from '../tasks/task.model';

import {
  createUser,
  viewUser,
  updateUser,
} from '../../interfaces/userInterfaces';

export const getAll = async (): Promise<Array<User>> => dataBase.users;

export const getById = async (id: string): Promise<User | undefined> =>
  dataBase.users.find((elment: User) => elment.id === id);

export const create = async ({
  name,
  login,
  password,
}: createUser): Promise<User | undefined> => {
  if (dataBase.users.find((elment: User) => elment.login === login)) {
    return undefined;
  }
  const user: User = new User({ name, login, password });
  dataBase.users.push(user);
  return user;
};

export const update = async ({
  id,
  name,
  login,
  password,
}: updateUser): Promise<User | undefined> => {
  const findedUserIndex: number = dataBase.users.findIndex(
    (elment: User) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    const foundedUser: User = <User>dataBase.users[findedUserIndex];
    foundedUser.name = name;
    foundedUser.login = login;
    foundedUser.password = password;
    return foundedUser;
  }
  return undefined;
};

export const deletById = async (id: string): Promise<User | undefined> => {
  const findedUserIndex: number = dataBase.users.findIndex(
    (elment: User) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    dataBase.tasks.forEach((element: Task) => {
      const localElement = element;
      if (localElement.userId === id) {
        localElement.userId = null;
      }
    });
    const deletedUser = dataBase.users.splice(findedUserIndex, 1);
    return deletedUser;
  }
  return undefined;
};
