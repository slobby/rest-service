"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const task_model_1 = require("./task.model");
const getAll = async (boardId) => db_1.dataBase.tasks.filter((element) => element.boardId === boardId);
const getById = async ({ boardId, id, }) => db_1.dataBase.tasks.find((elment) => elment.id === id && elment.boardId === boardId);
const create = async ({ title, order, description, userId, boardId, columnId, }) => {
    const task = new task_model_1.Task({
        title,
        order,
        description,
        userId,
        boardId,
        columnId,
    });
    db_1.dataBase.tasks.push(task);
    return task;
};
const update = async ({ id, title, order, description, userId, boardId, columnId, }) => {
    const findedTaskIndex = db_1.dataBase.tasks.findIndex((elment) => elment.id === id);
    if (findedTaskIndex !== -1) {
        const foundedTask = db_1.dataBase.tasks[findedTaskIndex];
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
    const findedTaskIndex = db_1.dataBase.tasks.findIndex((elment) => elment.id === id && elment.boardId === boardId);
    if (findedTaskIndex !== -1) {
        const deletedTask = (db_1.dataBase.tasks.splice(findedTaskIndex, 1)[0]);
        return deletedTask;
    }
    return undefined;
};
exports.default = { getAll, getById, create, update, deletById };
