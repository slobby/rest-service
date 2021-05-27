"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_memory_repository_1 = __importDefault(require("./task.memory.repository"));
const getAll = async (boardId) => {
    const tasks = await task_memory_repository_1.default.getAll(boardId);
    return tasks.map((element) => element.toResponse());
};
const getById = async ({ boardId, id, }) => {
    const task = await task_memory_repository_1.default.getById({ boardId, id });
    if (task) {
        return task.toResponse();
    }
    return undefined;
};
const create = async ({ title, order, description, userId, boardId, columnId, }) => {
    const task = await task_memory_repository_1.default.create({
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
const update = async ({ id, title, order, description, userId, boardId, columnId, }) => {
    const task = await task_memory_repository_1.default.update({
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
const deletById = async ({ boardId, id, }) => {
    const task = await task_memory_repository_1.default.deletById({ boardId, id });
    if (task) {
        return task.toResponse();
    }
    return undefined;
};
exports.default = { getAll, getById, create, update, deletById };
