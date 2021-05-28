import { dataBase } from '../db/db.js';
import { Task } from './task.model.js';

import {
  createTask,
  updateTask,
  getByIdTaskRequest,
} from '../../interfaces/taskInterfaces';

const getAll = async (boardId: string): Promise<Array<Task>> =>
  dataBase.tasks.filter((element: Task) => element.boardId === boardId);

const getById = async ({
  boardId,
  id,
}: getByIdTaskRequest): Promise<Task | undefined> =>
  dataBase.tasks.find(
    (elment: Task) => elment.id === id && elment.boardId === boardId
  );

const create = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: createTask): Promise<Task> => {
  const task = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  dataBase.tasks.push(task);
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
  const findedTaskIndex = dataBase.tasks.findIndex(
    (elment: Task) => elment.id === id
  );
  if (findedTaskIndex !== -1) {
    const foundedTask: Task = <Task>dataBase.tasks[findedTaskIndex];
    foundedTask.title = title;
    foundedTask.order = order;
    foundedTask.description = description;
    foundedTask.userId = userId;
    foundedTask.boardId = boardId;
    foundedTask.columnId = columnId;
    return foundedTask;
  }
  return undefined;
};

const deletById = async ({
  boardId,
  id,
}: getByIdTaskRequest): Promise<Task | undefined> => {
  const findedTaskIndex: number = dataBase.tasks.findIndex(
    (elment: Task) => elment.id === id && elment.boardId === boardId
  );
  if (findedTaskIndex !== -1) {
    const deletedTask: Task = <Task>(
      dataBase.tasks.splice(findedTaskIndex, 1)[0]
    );
    return deletedTask;
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
