import { dataBase } from '../db/db';
import { User } from './user.model';
import {
  createUser,
  viewUser,
  updateUser,
} from '../../interfaces/userInterfaces';

export const getAll = async (): Promise<User[]> => dataBase.users;

export const getById = async (id: string): Promise<User | undefined> =>
  dataBase.users.find((elment: User) => elment.id === id);

export const create = async ({
  name,
  login,
  password,
}: createUser): Promise<User | undefined> => {
  if (dataBase.users.find((elment) => elment.login === login)) {
    return undefined;
  }
  const user = new User({ name, login, password });
  dataBase.users.push(user);
  return user;
};

export const update = async ({
  id,
  name,
  login,
  password,
}: updateUser): Promise<User | undefined> => {
  const findedUserIndex = dataBase.users.findIndex(
    (elment) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    const 
    dataBase.users[findedUserIndex].name = name;
    const updatedUser: updateUser = {
      ...dataBase.users[findedUserIndex],
      id,
      name,
      login,
      password,
    };
    dataBase.users.splice(findedUserIndex, 1, updatedUser);
    return updatedUser;
  }
  return undefined;
};

/**
 * Delete the user by Id
 * @param {string} id The Id of user
 * @returns {Promise<User|undefined>} Deleted user if success, or undefinded otherwise
 */
export const deletById = async (id): Promise<User | undefined> => {
  const findedUserIndex = dataBase.users.findIndex(
    (elment) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    dataBase.tasks.forEach((element) => {
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
