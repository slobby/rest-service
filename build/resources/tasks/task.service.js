"use strict";
const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');
const getAll = async (boardId) => {
    const tasks = await tasksRepo.getAll(boardId);
    return tasks.map(Task.toResponse);
};
const getById = async ({ boardId, id }) => {
    const task = await tasksRepo.getById({ boardId, id });
    if (task) {
        return Task.toResponse(task);
    }
    return undefined;
};
const create = async ({ title, order, description, userId, boardId, columnId }) => {
    const task = await tasksRepo.create({ title, order, description, userId, boardId, columnId });
    if (task) {
        return Task.toResponse(task);
    }
    return undefined;
};
const update = async ({ id, title, order, description, userId, boardId, columnId }) => {
    const task = await tasksRepo.update({ id, title, order, description, userId, boardId, columnId });
    if (task) {
        return Task.toResponse(task);
    }
    return undefined;
};
const deletById = async ({ boardId, id }) => {
    const task = await tasksRepo.deletById({ boardId, id });
    if (task) {
        return Task.toResponse(task);
    }
    return undefined;
};
module.exports = { getAll, getById, create, update, deletById };
