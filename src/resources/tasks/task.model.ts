import { v4 as uuid } from 'uuid';
import { updateTask, viewTask } from '../../interfaces/taskInterfaces.js';
import { IModel } from '../../interfaces/interfaces.js';

export class Task implements IModel<viewTask> {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuid(),
    title = 'Title',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null,
  }: updateTask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  toResponse(): viewTask {
    const viewtask: viewTask = {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId,
    };
    return viewtask;
  }
}
