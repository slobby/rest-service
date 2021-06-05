import { User } from '../users/user.model.js';
import { Board } from '../boards/board.model.js';
import { Column } from '../columns/column.model.js';
import { Task } from '../tasks/task.model.js';

export interface IDB {
  users: Array<User>;
  boards: Array<Board>;
  columns: Array<Column>;
  tasks: Array<Task>;
}

export const dataBase: IDB = {
  users: [],
  boards: [],
  columns: [],
  tasks: [],
};
