/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnBoard } from '../../columns/entities/column-board.entity.js';
import { Task } from '../../tasks/entities/task.entity';
import { ViewBoardDto } from '../dto/view-board.dto.js';
import { IBoard } from '../interfaces/IBoard';

@Entity({
  name: 'Board',
})
export class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  title: string;

  @OneToMany(() => ColumnBoard, (column: ColumnBoard) => column.board, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
    eager: true,
  })
  columns: Array<ColumnBoard>;

  @OneToMany(() => Task, (task: Task) => task.board, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  tasks: Array<Task>;

  static toResponse(board: Board): ViewBoardDto {
    const { id, title, columns } = board;
    return {
      id,
      title,
      columns: columns.map((element) => ColumnBoard.toResponse(element)),
    };
  }
}
