import { v4 as uuid } from 'uuid';
import { viewColumn } from '../../interfaces/columnInterfaces.js';
import { IModel } from '../../interfaces/interfaces.js';

export class Column implements IModel<viewColumn> {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  toResponse(): viewColumn {
    const viewcolumn: viewColumn = {
      id: this.id,
      title: this.title,
      order: this.order,
    };
    return viewcolumn;
  }
}
