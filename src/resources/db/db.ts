import { User } from '../users/user.model';
import { Board } from '../boards/board.model';
import { Column } from '../columns/column.model';
import { Task } from '../tasks/task.model';

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
