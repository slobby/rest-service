"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const task_service_1 = __importDefault(require("./task.service"));
const getAll = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        if (!boardId) {
            throw new http_errors_1.default.BadRequest('Don`t receive board id.');
        }
        const tasks = await task_service_1.default.getAll(boardId);
        res.status(http_status_codes_1.default.OK).json(tasks);
    }
    catch (error) {
        next(new http_errors_1.default.NotFound('Not found boards.'));
    }
};
const create = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        if (!boardId) {
            throw new http_errors_1.default.BadRequest('Don`t receive board id.');
        }
        const { title, order, description, userId = null, columnId = null, } = req.body;
        // Disgusting tests
        if (!title) {
            throw new http_errors_1.default.BadRequest('Received not all fields for task.');
        }
        const task = await task_service_1.default.create({
            title,
            order,
            description,
            userId,
            boardId,
            columnId,
        });
        if (task) {
            res.status(http_status_codes_1.default.CREATED).json(task);
        }
        else {
            throw new http_errors_1.default.InternalServerError('Couldn`t create task.');
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
            throw new http_errors_1.default.BadRequest('Don`t receive board id or task id.');
        }
        const task = await task_service_1.default.getById({
            boardId,
            id,
        });
        if (task) {
            res.status(http_status_codes_1.default.OK).json(task);
        }
        else {
            throw new http_errors_1.default.NotFound('Not found.');
        }
    }
    catch (error) {
        next(error);
    }
};
const update = async (req, res, next) => {
    try {
        const id = req.params['taskId'];
        const { title, order, description, userId = null, boardId = null, columnId = null, } = req.body;
        // Disgusting tests
        if (!id) {
            throw new http_errors_1.default.BadRequest('Received not all fields for task.');
        }
        const task = await task_service_1.default.update({
            id,
            title,
            order,
            description,
            userId,
            boardId,
            columnId,
        });
        if (task) {
            res.status(http_status_codes_1.default.OK).json(task);
        }
        else {
            throw new http_errors_1.default.NotFound('Not found.');
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
            throw new http_errors_1.default.BadRequest('Don`t receive board id or task id.');
        }
        const task = await task_service_1.default.deletById({ boardId, id });
        if (task) {
            res.status(http_status_codes_1.default.NO_CONTENT).json(task);
        }
        else {
            throw new http_errors_1.default.NotFound('Not found.');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = { getAll, create, getById, update, deletById };
