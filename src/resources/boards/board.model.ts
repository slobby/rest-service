import { v4 as uuid } from 'uuid';
import { createBoard, viewBoard } from '../../interfaces/boardInterfaces';
import { IModel } from '../../interfaces/interfaces';
import { Column } from '../columns/column.model';

export class Board implements IModel<viewBoard> {
  id: string;

  title: string;

  columns: Array<Column>;

  constructor({ title = 'Board', columns = [] }: createBoard) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return a representing of board for response
   * @static
   * @param {Board} board a board
   * @returns {Board} board`s parameters for responce
   */
  toResponse(): viewBoard {
    const viewboard: viewBoard = {
      id: this.id,
      title: this.title,
      columns: this.columns,
    };
    return viewboard;
  }
}
