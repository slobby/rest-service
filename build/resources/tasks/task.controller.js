"use strict";
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const tasksService = require('./task.service');
const getAll = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        if (!boardId) {
            throw createError.BadRequest('Don`t receive board id.');
        }
        const tasks = await tasksService.getAll(boardId);
        res.status(StatusCodes.OK).json(tasks);
    }
    catch (error) {
        next(createError.NotFound('Not found boards.'));
    }
};
const create = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const { title, order, description, userId, columnId } = req.body;
        // Disgusting tests
        if (!title) {
            throw createError.BadRequest('Received not all fields for task.');
        }
        const task = await tasksService.create({ title, order, description, userId, boardId, columnId });
        if (task) {
            res.status(StatusCodes.CREATED).json(task);
        }
        else {
            throw createError.InternalServerError('Couldn`t create task.');
        }
    }
    catch (error) {
        next(error);
    }
};
const getById = async (req, res, next) => {
    try {
        const { boardId, taskId: id } = req.params;
        if (!boardId || !id) {
            throw createError.BadRequest('Don`t receive board id or task id.');
        }
        const task = await tasksService.getById({ boardId, id });
        if (task) {
            res.status(StatusCodes.OK).json(task);
        }
        else {
            throw createError.NotFound('Not found.');
        }
    }
    catch (error) {
        next(error);
    }
};
const update = async (req, res, next) => {
    try {
        const id = req.params.taskId;
        const { title, order, description, userId = null, boardId = null, columnId = null } = req.body;
        // Disgusting tests
        if (!id) {
            throw createError.BadRequest('Received not all fields for task.');
        }
        const task = await tasksService.update({ id, title, order, description, userId, boardId, columnId });
        if (task) {
            res.status(StatusCodes.OK).json(task);
        }
        else {
            throw createError.NotFound('Not found.');
        }
    }
    catch (error) {
        next(error);
    }
};
const deletById = async (req, res, next) => {
    try {
        const { boardId, taskId: id } = req.params;
        if (!boardId || !id) {
            throw createError.BadRequest('Don`t receive board id or task id.');
        }
        const task = await tasksService.deletById({ boardId, id });
        if (task) {
            res.status(StatusCodes.NO_CONTENT).json(task);
        }
        else {
            throw createError.NotFound('Not found.');
        }
    }
    catch (error) {
        next(error);
    }
};
module.exports = { getAll, create, getById, update, deletById };
