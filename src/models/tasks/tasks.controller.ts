import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ViewTaskDto } from './dto/view-task.dto';
import { Task } from './entities/task.entity';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<ViewTaskDto> {
    if (!boardId) {
      throw new BadRequestException();
    }
    return Task.toResponse(
      await this.tasksService.create({ ...createTaskDto, boardId }),
    );
  }

  @Get()
  async getAll(@Param('boardId') boardId: string): Promise<Array<ViewTaskDto>> {
    if (!boardId) {
      throw new BadRequestException();
    }
    return (await this.tasksService.getAll(boardId)).map((element) =>
      Task.toResponse(element),
    );
  }

  @Get(':id')
  async getById(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
  ): Promise<ViewTaskDto> {
    if (!boardId) {
      throw new BadRequestException();
    }
    const task = await this.tasksService.getById(id);
    if (task) {
      return Task.toResponse(task);
    }
    throw new NotFoundException();
  }

  @Put(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ViewTaskDto> {
    if (!boardId) {
      throw new BadRequestException();
    }
    const task = await this.tasksService.update(id, updateTaskDto);
    if (task) {
      return Task.toResponse(task);
    }
    throw new NotFoundException();
  }

  @Delete(':id')
  async deletById(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
  ): Promise<ViewTaskDto> {
    if (!boardId) {
      throw new BadRequestException();
    }
    const task = await this.tasksService.deletById(id);
    if (task) {
      return Task.toResponse({ ...task, id });
    }
    throw new NotFoundException();
  }
}
