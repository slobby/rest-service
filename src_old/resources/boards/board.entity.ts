/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnDTO } from '../columns/column.entity.js';
import { TaskDTO } from '../tasks/task.entity.js';

@Entity({
  name: 'Board',
})
export class BoardDTO {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @OneToMany(() => ColumnDTO, (column: ColumnDTO) => column.board, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
    eager: true,
  })
  columns: Array<ColumnDTO>;

  @OneToMany(() => TaskDTO, (task: TaskDTO) => task.board, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  tasks: Array<TaskDTO>;
}
