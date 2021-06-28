/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserDTO } from '../users/user.entity.js';
import { ColumnDTO } from '../columns/column.entity.js';
import { BoardDTO } from '../boards/board.entity.js';

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
    eager: true,
  })
  user: UserDTO;

  @ManyToOne(() => ColumnDTO, (column: ColumnDTO) => column.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  column: ColumnDTO;

  @ManyToOne(() => BoardDTO, (board: BoardDTO) => board.tasks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  board: BoardDTO;
}
