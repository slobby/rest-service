import { ITask } from '../interfaces/ITask';

export class UpdateTaskDto implements Partial<ITask> {
  id?: string;

  title?: string;

  order?: number;

  description?: string;

  userId?: string | null;

  boardId?: string | null;

  columnId?: string | null;
}
