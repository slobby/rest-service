import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { ColumnBoard } from '../columns/entities/column-board.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ColumnBoard)
    private columnsRepository: Repository<ColumnBoard>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = this.tasksRepository.create(createTaskDto);

    if (createTaskDto.userId !== null) {
      const taskUser = await this.usersRepository.findOne(createTaskDto.userId);
      if (taskUser) task.user = taskUser;
    }

    if (createTaskDto.boardId !== null) {
      const taskBoard = await this.boardsRepository.findOne(
        createTaskDto.boardId,
      );
      if (taskBoard) task.board = taskBoard;
    }

    if (createTaskDto.columnId !== null) {
      const taskColumn = await this.columnsRepository.findOne(
        createTaskDto.columnId,
      );
      if (taskColumn) task.column = taskColumn;
    }

    return this.tasksRepository.save(task);
  }

  async getAll(boardId: string): Promise<Array<Task>> {
    return this.tasksRepository.find({
      where: { board: { id: boardId } },
    });
  }

  async getById(id: string): Promise<Task | undefined> {
    return this.tasksRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task | undefined> {
    const task = await this.getById(id);
    if (task) {
      if (updateTaskDto.userId !== null) {
        const taskUser = await this.usersRepository.findOne(
          updateTaskDto.userId,
        );
        if (taskUser) task.user = taskUser;
      }

      if (updateTaskDto.boardId !== null) {
        const taskBoard = await this.boardsRepository.findOne(
          updateTaskDto.boardId,
        );
        if (taskBoard) task.board = taskBoard;
      }

      if (updateTaskDto.columnId !== null) {
        const taskColumn = await this.columnsRepository.findOne(
          updateTaskDto.columnId,
        );
        if (taskColumn) task.column = taskColumn;
      }

      return this.tasksRepository.save({ ...task, ...updateTaskDto });
    }
    return undefined;
  }

  async deletById(id: string): Promise<Task | undefined> {
    const task = await this.getById(id);
    if (task) {
      await this.tasksRepository.remove(task);
      return task;
    }
    return undefined;
  }
}
