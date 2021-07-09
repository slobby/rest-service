import { IColumnBoard } from '../interfaces/IColumnBoard';

export class ViewColumnBoardDto implements Partial<IColumnBoard> {
  id: string;

  title: string;

  order: number;
}
