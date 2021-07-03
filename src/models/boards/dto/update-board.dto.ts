import { UpdateColumnBoardDto } from 'src/models/columns/dto/update-column-board.dto';
import { IBoard } from '../interfaces/IBoard';

export class UpdateBoardDto implements Partial<IBoard> {
  id?: string;

  title?: string;

  columns?: Array<UpdateColumnBoardDto>;
}
