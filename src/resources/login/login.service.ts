// import jwt from 'jsonwebtoken';
import usersRepo from '../users/user.repository.js';
import { User } from '../users/user.model.js';
// import { JWT_SECRET_KEY } from '../../common/config.js';
import { loginReqBody } from '../../interfaces/loginInterfaces.js';

const getJWT = async (params: loginReqBody): Promise<string | undefined> => {
  const user: User | undefined = await usersRepo.getByLoginParams(params);
  if (user) {
    // const { id: userId, login } = user;
    return 'HIRRRR';
    // return jwt.sign({ userId, login }, JWT_SECRET_KEY, {
    //   header: { alg: 'HS256', typ: 'JWT' },
    // });
  }
  return undefined;
};

export default { getJWT };
