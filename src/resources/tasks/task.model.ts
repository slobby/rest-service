import { v4 as uuid } from 'uuid';
import { createTask, viewTask } from '../../interfaces/taskInterfaces.js';
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
    title = 'Title',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null,
  }: createTask) {
    this.id = uuid();
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
