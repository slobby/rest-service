import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';
import { ColumnBoard } from '../columns/entities/column-board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User, ColumnBoard, Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
