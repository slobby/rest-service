/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Board } from '../../boards/entities/board.entity.js';
import { User } from '../../users/entities/user.entity';
import { ColumnBoard } from '../../columns/entities/column-board.entity.js';
import { ITask } from '../interfaces/ITask.js';

@Entity({
  name: 'Task',
})
export class Task implements ITask {
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

  @ManyToOne(() => User, (user: User) => user.tasks, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  user: User;

  @ManyToOne(() => ColumnBoard, (column: ColumnBoard) => column.tasks, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  column: ColumnBoard;

  @ManyToOne(() => Board, (board: Board) => board.tasks, {
    onDelete: 'CASCADE',
    eager: true,
  })
  board: Board;
}
