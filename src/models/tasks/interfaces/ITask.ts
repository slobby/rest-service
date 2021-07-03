/* eslint-disable import/no-cycle */
import { IColumnBoard } from '../../columns/interfaces/IColumnBoard.js';
import { IBoard } from '../../boards/interfaces/IBoard.js';
import { IUser } from '../../users/interfaces/IUser';

export interface ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  user: IUser;

  column: IColumnBoard;

  board: IBoard;
}
