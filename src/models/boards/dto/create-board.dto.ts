import { IsArray, IsString } from 'class-validator';
import { CreateColumnBoardDto } from 'src/models/columns/dto/create-column-board.dto';
import { IBoard } from '../interfaces/IBoard';

export class CreateBoardDto implements Omit<IBoard, 'id'> {
  @IsString()
  title: string;

  @IsArray()
  columns: Array<CreateColumnBoardDto>;
}
