"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const board_memory_repository_1 = __importDefault(require("./board.memory.repository"));
const getAll = async () => {
    const boards = await board_memory_repository_1.default.getAll();
    return boards.map((element) => element.toResponse());
};
const getById = async (id) => {
    const board = await board_memory_repository_1.default.getById(id);
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
const create = async ({ title, columns, }) => {
    const board = await board_memory_repository_1.default.create({ title, columns });
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
const update = async ({ id, title, columns, }) => {
    const board = await board_memory_repository_1.default.update({
        id,
        title,
        columns,
    });
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
const deletById = async (id) => {
    const board = await board_memory_repository_1.default.deletById(id);
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
exports.default = { getAll, getById, create, update, deletById };
