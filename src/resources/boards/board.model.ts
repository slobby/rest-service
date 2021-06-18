import { v4 as uuid } from 'uuid';
import { viewBoard } from '../../interfaces/boardInterfaces.js';
import { IModel } from '../../interfaces/interfaces.js';
import { Column } from '../columns/column.model.js';

export class Board implements IModel<viewBoard> {
  id: string;

  title: string;

  columns: Array<Column>;

  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  toResponse(): viewBoard {
    const viewboard: viewBoard = {
      id: this.id,
      title: this.title,
      columns: this.columns,
    };
    return viewboard;
  }
}
