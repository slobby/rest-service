import { IsInt, IsString } from 'class-validator';
import { IColumnBoard } from '../interfaces/IColumnBoard';

export class CreateColumnBoardDto implements Omit<IColumnBoard, 'id'> {
  @IsString()
  title: string;

  @IsInt()
  order: number;
}
