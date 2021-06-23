/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BoardDTO } from '../boards/board.entity.js';
import { TaskDTO } from '../tasks/task.entity.js';

@Entity({
  name: 'Column',
})
export class ColumnDTO {
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

  @OneToMany(() => TaskDTO, (task: TaskDTO) => task.column)
  tasks: Array<TaskDTO>;

  @ManyToOne(() => BoardDTO, (board: BoardDTO) => board.columns, {
    onDelete: 'CASCADE',
  })
  board: BoardDTO;
}
