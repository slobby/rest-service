import { IsString, IsInt } from 'class-validator';
import { ITask } from '../interfaces/ITask';

export class CreateTaskDto implements Omit<ITask, 'id'> {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;
}
