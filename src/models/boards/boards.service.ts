import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board: Board = this.boardsRepository.create(createBoardDto);
    return this.boardsRepository.save(board);
  }

  async getAll(): Promise<Array<Board>> {
    return this.boardsRepository.find();
  }

  async getById(id: string): Promise<Board | undefined> {
    return this.boardsRepository.findOne(id);
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board | undefined> {
    const board = await this.getById(id);
    if (board) {
      await this.boardsRepository.save({ ...board, ...updateBoardDto });
      return this.getById(id);
    }
    return undefined;
  }

  async deletById(id: string): Promise<Board | undefined> {
    const board = await this.getById(id);
    if (board) {
      await this.boardsRepository.remove(board);
      return board;
    }
    return undefined;
  }
}
