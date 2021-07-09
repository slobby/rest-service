/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { Board } from '../../boards/entities/board.entity';
import { IColumnBoard } from '../interfaces/IColumnBoard';
import { ViewColumnBoardDto } from '../dto/view-column-board.dto';

@Entity({
  name: 'Column',
})
export class ColumnBoard implements IColumnBoard {
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

  @OneToMany(() => Task, (task: Task) => task.column)
  tasks: Array<Task>;

  @ManyToOne(() => Board, (board: Board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board: Board;

  static toResponse(columnBoard: ColumnBoard): ViewColumnBoardDto {
    const { tasks, board, ...viewColumnBoardDto } = columnBoard;
    return viewColumnBoardDto;
  }
}
