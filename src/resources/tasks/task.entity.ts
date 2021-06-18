/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserDTO } from '../users/user.entity.js';
import { ColumnDTO } from '../columns/column.entity.js';

@Entity({
  name: 'Tasks',
})
export class TaskDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @Column({
    type: 'smallint',
  })
  order: number;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => UserDTO, (user: UserDTO) => user.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user: UserDTO;

  @ManyToOne(() => ColumnDTO, (column: ColumnDTO) => column.tasks, {
    onDelete: 'CASCADE',
  })
  column: ColumnDTO;
}
