import {
  NotFoundException,
  Put,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';

import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ViewBoardDto } from './dto/view-board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<ViewBoardDto> {
    return Board.toResponse(await this.boardsService.create(createBoardDto));
  }

  @Get()
  async getAll(): Promise<Array<ViewBoardDto>> {
    return (await this.boardsService.getAll()).map((element) =>
      Board.toResponse(element),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ViewBoardDto> {
    const board = await this.boardsService.getById(id);
    if (board) {
      return Board.toResponse(board);
    }
    throw new NotFoundException();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<ViewBoardDto> {
    const board = await this.boardsService.update(id, updateBoardDto);
    if (board) {
      return Board.toResponse(board);
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  async deletById(@Param('id') id: string): Promise<ViewBoardDto> {
    const board = await this.boardsService.deletById(id);
    if (board) {
      return Board.toResponse({ ...board, id });
    }
    throw new NotFoundException();
  }
}
