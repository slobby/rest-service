import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/hashPassword';
import { validatePassword } from 'src/helpers/validatePassword';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUser } from './interfaces/IUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      name: createUserDto.name,
      login: createUserDto.login,
      password: hashPassword(createUserDto.password),
    });
    return this.usersRepository.save(user);
  }

  async getAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  async getById(id: string): Promise<User | undefined> {
    return (await this.usersRepository.findByIds([id]))[0];
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const findedUser = await this.getById(id);
    if (findedUser) {
      const password = updateUserDto.password
        ? hashPassword(updateUserDto.password)
        : findedUser.password;
      await this.usersRepository.update(id, { ...updateUserDto, password });
      return this.getById(id);
    }
    return undefined;
  }

  async deletById(id: string): Promise<User | undefined> {
    const findedUser = await this.getById(id);
    if (findedUser) {
      await this.usersRepository.remove(findedUser);
      return findedUser;
    }
    return undefined;
  }

  async getByLoginParams({
    login,
    password,
  }: Omit<IUser, 'id' | 'name'>): Promise<User | undefined> {
    const findedUser = await this.usersRepository
      .createQueryBuilder('User')
      .where('User.login = :login', { login })
      .getOne();
    if (findedUser && validatePassword(password, findedUser.password)) {
      return findedUser;
    }
    return undefined;
  }
}
