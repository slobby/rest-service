import { dataBase } from '../db/db.js';
import { User } from './user.model.js';
import { Task } from '../tasks/task.model.js';
import { createUser, updateUser } from '../../interfaces/userInterfaces.js';

const getAll = async (): Promise<Array<User>> => dataBase.users;

const getById = async (id: string): Promise<User | undefined> =>
  dataBase.users.find((elment: User) => elment.id === id);

const create = async ({ name, login, password }: createUser): Promise<User> => {
  const user: User = new User({ name, login, password });
  dataBase.users.push(user);
  return user;
};

const update = async ({
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

const deletById = async (id: string): Promise<User | undefined> => {
  const findedUserIndex: number = dataBase.users.findIndex(
    (elment: User) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    dataBase.tasks.forEach((element: Task) => {
      const localElement: Task = element;
      if (localElement.userId === id) {
        localElement.userId = null;
      }
    });
    const deletedUser: User = <User>(
      dataBase.users.splice(findedUserIndex, 1)[0]
    );
    return deletedUser;
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
