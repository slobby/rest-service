import { Column } from '../resources/columns/column.model';
import { createColumn, updateColumn } from './columnInterfaces';

export type createBoard = {
  title: string;
  columns: Array<Column>;
};

export type createFromRawBoard = {
  title: string;
  columns: Array<createColumn>;
};

export type updateBoard = {
  id: string;
  title: string;
  columns: Array<updateColumn>;
};

export type viewBoard = {
  id: string;
  title: string;
  columns: Array<Column>;
};
