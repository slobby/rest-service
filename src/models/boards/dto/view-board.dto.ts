import { ViewColumnBoardDto } from 'src/models/columns/dto/view-column-board.dto';
import { IBoard } from '../interfaces/IBoard';

export class ViewBoardDto implements IBoard {
  id: string;

  title: string;

  columns: Array<ViewColumnBoardDto>;
}
