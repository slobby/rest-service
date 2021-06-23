/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskDTO } from '../tasks/task.entity.js';

@Entity({
  name: 'User',
})
export class UserDTO {
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

  @OneToMany(() => TaskDTO, (task: TaskDTO) => task.user)
  tasks: Array<TaskDTO>;
}
