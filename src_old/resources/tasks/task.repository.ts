import { getRepository } from 'typeorm';
import { TaskDTO } from './task.entity.js';
import { ColumnDTO } from '../columns/column.entity.js';
import { UserDTO } from '../users/user.entity.js';
import { Task } from './task.model.js';

import {
  createTask,
  updateTask,
  getByIdTaskRequest,
} from '../../interfaces/taskInterfaces';
import { BoardDTO } from '../boards/board.entity.js';

const getAll = async (boardId: string): Promise<Array<Task>> => {
  const taskRepository = getRepository(TaskDTO);
  const tasksDTO = await taskRepository.find({
    where: { board: { id: boardId } },
  });
  return tasksDTO.map(
    (taskDTO) =>
      new Task({
        id: taskDTO.id,
        title: taskDTO.title,
        order: taskDTO.order,
        description: taskDTO.description,
        userId: taskDTO?.user?.id,
        boardId: taskDTO?.board?.id,
        columnId: taskDTO?.column?.id,
      })
  );
};

const getById = async ({
  boardId,
  id,
}: getByIdTaskRequest): Promise<Task | undefined> => {
  const taskRepository = getRepository(TaskDTO);
  const taskDTO = (
    await taskRepository.find({
      where: { id, board: { id: boardId } },
    })
  )[0];
  if (taskDTO) {
    return new Task({
      id: taskDTO.id,
      title: taskDTO.title,
      order: taskDTO.order,
      description: taskDTO.description,
      userId: taskDTO?.user?.id,
      boardId: taskDTO?.board?.id,
      columnId: taskDTO?.column?.id,
    });
  }
  return undefined;
};

const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: createTask): Promise<Task> => {
  const taskRepository = getRepository(TaskDTO);
  const columnRepository = getRepository(ColumnDTO);
  const boardRepository = getRepository(BoardDTO);
  const userRepository = getRepository(UserDTO);
  const taskDTO: TaskDTO = new TaskDTO();
  taskDTO.title = title;
  taskDTO.order = order;
  taskDTO.description = description;

  if (userId !== null) {
    const taskUser = (await userRepository.findByIds([userId]))[0];
    if (taskUser) taskDTO.user = taskUser;
  }

  if (boardId !== null) {
    const taskBoard = (await boardRepository.findByIds([boardId]))[0];
    if (taskBoard) taskDTO.board = taskBoard;
  }

  if (columnId !== null) {
    const taskColumn = (await columnRepository.findByIds([columnId]))[0];
    if (taskColumn) taskDTO.column = taskColumn;
  }

  const newTaskDTO = await taskRepository.save(taskDTO);

  const task = new Task({
    id: newTaskDTO.id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  return task;
};

const update = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: updateTask): Promise<Task | undefined> => {
  const taskRepository = getRepository(TaskDTO);
  const columnRepository = getRepository(ColumnDTO);
  const boardRepository = getRepository(BoardDTO);
  const userRepository = getRepository(UserDTO);
  const taskDTO = (await taskRepository.find({ where: { id } }))[0];
  if (taskDTO) {
    taskDTO.title = title;
    taskDTO.order = order;
    taskDTO.description = description;

    if (userId !== null) {
      const taskUser = (await userRepository.findByIds([userId]))[0];
      if (taskUser) taskDTO.user = taskUser;
    }

    if (boardId !== null) {
      const taskBoard = (await boardRepository.findByIds([boardId]))[0];
      if (taskBoard) taskDTO.board = taskBoard;
    }

    if (columnId !== null) {
      const taskColumn = (await columnRepository.findByIds([columnId]))[0];
      if (taskColumn) taskDTO.column = taskColumn;
    }

    const newTaskDTO = await taskRepository.save(taskDTO);

    return new Task({
      id: newTaskDTO.id,
      title: newTaskDTO.title,
      order: newTaskDTO.order,
      description: newTaskDTO.description,
      userId: newTaskDTO?.user?.id,
      boardId: newTaskDTO?.board?.id,
      columnId: newTaskDTO?.column?.id,
    });
  }
  return undefined;
};

const deletById = async ({
  boardId,
  id,
}: getByIdTaskRequest): Promise<Task | undefined> => {
  const taskRepository = getRepository(TaskDTO);
  const taskDTO = (
    await taskRepository.find({
      where: { id, board: { id: boardId } },
    })
  )[0];
  if (taskDTO) {
    await taskRepository.remove(taskDTO);
    return new Task({
      id: taskDTO.id,
      title: taskDTO.title,
      order: taskDTO.order,
      description: taskDTO.description,
      userId: taskDTO?.user?.id,
      boardId: taskDTO?.board?.id,
      columnId: taskDTO?.column?.id,
    });
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
