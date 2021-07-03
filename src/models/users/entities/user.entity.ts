/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { ViewUserDto } from '../dto/view-user.dto';
import { IUser } from '../interfaces/IUser';

@Entity({
  name: 'User',
})
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  login: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  password: string;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Array<Task>;

  static toResponse(user: User): ViewUserDto {
    const { password, tasks, ...viewUserDto } = user;
    return viewUserDto;
  }
}
