import { Injectable } from '@nestjs/common';
import { CreateColumnBoardDto } from './dto/create-column-board.dto';
import { UpdateColumnBoardDto } from './dto/update-column-board.dto';

@Injectable()
export class ColumnsService {
  create(createColumnBoardDto: CreateColumnBoardDto) {
    return `This action adds a new column ${createColumnBoardDto}`;
  }

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnDto: UpdateColumnBoardDto) {
    return `This action updates a #${id} column ${updateColumnDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
