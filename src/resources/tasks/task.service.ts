import tasksRepo from './task.memory.repository';
import { Task } from './task.model';
import {
  createTask,
  updateTask,
  viewTask,
  getByIdTaskRequest,
} from '../../interfaces/taskInterfaces';

const getAll = async (boardId: string): Promise<Array<viewTask>> => {
  const tasks: Array<Task> = await tasksRepo.getAll(boardId);
  return tasks.map((element: Task): viewTask => element.toResponse());
};

const getById = async ({
  boardId,
  id,
}: getByIdTaskRequest): Promise<viewTask | undefined> => {
  const task = await tasksRepo.getById({ boardId, id });
  if (task) {
    return task.toResponse();
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
}: createTask): Promise<viewTask | undefined> => {
  const task: Task = await tasksRepo.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  if (task) {
    return task.toResponse();
  }
  return undefined;
};

const update = async ({
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: updateTask): Promise<viewTask | undefined> => {
  const task: Task | undefined = await tasksRepo.update({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  if (task) {
    return task.toResponse();
  }
  return undefined;
};

const deletById = async ({
  boardId,
  id,
}: getByIdTaskRequest): Promise<viewTask | undefined> => {
  const task: Task | undefined = await tasksRepo.deletById({ boardId, id });
  if (task) {
    return task.toResponse();
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
