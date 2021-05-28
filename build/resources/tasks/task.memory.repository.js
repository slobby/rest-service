import { dataBase } from '../db/db.js';
import { Task } from './task.model.js';
const getAll = async (boardId) => dataBase.tasks.filter((element) => element.boardId === boardId);
const getById = async ({ boardId, id, }) => dataBase.tasks.find((elment) => elment.id === id && elment.boardId === boardId);
const create = async ({ title, order, description, userId, boardId, columnId, }) => {
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
const update = async ({ id, title, order, description, userId, boardId, columnId, }) => {
    const findedTaskIndex = dataBase.tasks.findIndex((elment) => elment.id === id);
    if (findedTaskIndex !== -1) {
        const foundedTask = dataBase.tasks[findedTaskIndex];
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
const deletById = async ({ boardId, id, }) => {
    const findedTaskIndex = dataBase.tasks.findIndex((elment) => elment.id === id && elment.boardId === boardId);
    if (findedTaskIndex !== -1) {
        const deletedTask = (dataBase.tasks.splice(findedTaskIndex, 1)[0]);
        return deletedTask;
    }
    return undefined;
};
export default { getAll, getById, create, update, deletById };
