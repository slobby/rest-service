import { getRepository } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { UserDTO } from './user.entity.js';
import { User } from './user.model.js';
import { createUser, updateUser } from '../../interfaces/userInterfaces.js';
import { loginReqBody } from '../../interfaces/loginInterfaces.js';

const hashPassword = (password: string): string => hashSync(password, 10);

const getAll = async (): Promise<Array<User>> => {
  const userRepository = getRepository(UserDTO);
  const usersDTO = await userRepository.find();
  return usersDTO.map((userDTO) => new User({ ...userDTO }));
};

const getById = async (id: string): Promise<User | undefined> => {
  const userRepository = getRepository(UserDTO);
  const findedUserDTO: UserDTO | undefined = (
    await userRepository.findByIds([id])
  )[0];
  if (findedUserDTO) {
    return new User({ ...findedUserDTO });
  }
  return undefined;
};

const create = async ({ name, login, password }: createUser): Promise<User> => {
  const userRepository = getRepository(UserDTO);
  const userDTO: UserDTO = new UserDTO();
  userDTO.name = name;
  userDTO.login = login;
  userDTO.password = hashPassword(password);
  const userDTOSaved = await userRepository.save(userDTO);
  return new User({ ...userDTOSaved });
};

const update = async ({
  id,
  name,
  login,
  password,
}: updateUser): Promise<User | undefined> => {
  const userRepository = getRepository(UserDTO);
  const findedUserDTO: UserDTO | undefined = (
    await userRepository.findByIds([id])
  )[0];
  if (findedUserDTO) {
    findedUserDTO.name = name;
    findedUserDTO.login = login;
    findedUserDTO.password = hashPassword(password);
    await userRepository.save(findedUserDTO);
    return new User({ ...findedUserDTO });
  }
  return undefined;
};

const deletById = async (id: string): Promise<User | undefined> => {
  const userRepository = getRepository(UserDTO);
  const findedUserDTO: UserDTO | undefined = (
    await userRepository.findByIds([id])
  )[0];
  if (findedUserDTO) {
    await userRepository.remove(findedUserDTO);
    return new User({ ...findedUserDTO });
  }
  return undefined;
};

const getByLoginParams = async ({
  login,
  password,
}: loginReqBody): Promise<User | undefined> => {
  const userRepository = getRepository(UserDTO);
  const findedUserDTO: UserDTO | undefined = await userRepository
    .createQueryBuilder('User')
    .where('User.login = :login', { login })
    .andWhere('User.password = :password', { password: hashPassword(password) })
    .getOne();
  if (findedUserDTO) {
    return new User({ ...findedUserDTO });
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById, getByLoginParams };
