import usersRepo from './user.repository.js';
import { User } from './user.model.js';
import {
  createUser,
  updateUser,
  viewUser,
} from '../../interfaces/userInterfaces.js';

const getAll = async (): Promise<Array<viewUser>> => {
  const users: Array<User> = await usersRepo.getAll();
  return users.map((element: User): viewUser => element.toResponse());
};

const getById = async (id: string): Promise<viewUser | undefined> => {
  const user: User | undefined = await usersRepo.getById(id);
  if (user) {
    return user.toResponse();
  }
  return undefined;
};

const create = async ({
  name,
  login,
  password,
}: createUser): Promise<viewUser | undefined> => {
  const user: User = await usersRepo.create({ name, login, password });
  if (user) {
    return user.toResponse();
  }
  return undefined;
};

const update = async ({
  id,
  name,
  login,
  password,
}: updateUser): Promise<viewUser | undefined> => {
  const user: User | undefined = await usersRepo.update({
    id,
    name,
    login,
    password,
  });
  if (user) {
    return user.toResponse();
  }
  return undefined;
};

const deletById = async (id: string): Promise<viewUser | undefined> => {
  const user: User | undefined = await usersRepo.deletById(id);
  if (user) {
    return user.toResponse();
  }
  return undefined;
};

export default { getAll, create, getById, update, deletById };
