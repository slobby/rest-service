import { Column } from '../resources/columns/column.model.js';
import { createColumn, updateColumn } from './columnInterfaces.js';

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
