import { IColumnBoard } from '../interfaces/IColumnBoard';

export class UpdateColumnBoardDto implements Partial<IColumnBoard> {
  id?: string;

  title?: string;

  order?: number;
}
