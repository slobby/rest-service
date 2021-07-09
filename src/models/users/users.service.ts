import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from '../../common/helpers/hashPassword';
import { validatePassword } from '../../common/helpers/validatePassword';
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
    const user: User = this.usersRepository.create({
      ...createUserDto,
      password: hashPassword(createUserDto.password),
    });
    return this.usersRepository.save(user);
  }

  async getAll(): Promise<Array<User>> {
    return this.usersRepository.find();
  }

  async getById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
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
    const user = await this.getById(id);
    if (user) {
      await this.usersRepository.remove(user);
      return user;
    }
    return undefined;
  }

  async getByLoginParams({
    login,
    password,
  }: Omit<IUser, 'id' | 'name'>): Promise<User | undefined> {
    const user = await this.usersRepository
      .createQueryBuilder('User')
      .where('User.login = :login', { login })
      .getOne();
    if (user && validatePassword(password, user.password)) {
      return user;
    }
    return undefined;
  }
}
