import { v4 as uuid } from 'uuid';
import { createColumn, viewColumn } from '../../interfaces/columnInterfaces';
import { IModel } from '../../interfaces/interfaces';

export class Column implements IModel<viewColumn> {
  id: string;

  title: string;

  order: number;

  constructor({ title = 'Column', order = 0 }: createColumn) {
    this.id = uuid();
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
