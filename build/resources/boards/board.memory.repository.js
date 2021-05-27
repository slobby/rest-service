"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const board_model_1 = require("./board.model");
const column_model_1 = require("../columns/column.model");
const column_memory_repository_1 = __importDefault(require("../columns/column.memory.repository"));
const task_memory_repository_1 = __importDefault(require("../tasks/task.memory.repository"));
const getAll = async () => db_1.dataBase.boards;
const getById = async (id) => db_1.dataBase.boards.find((elment) => elment.id === id);
const create = async ({ title, columns, }) => {
    const columnsToBoard = [];
    columns.forEach(async (element) => columnsToBoard.push(await column_memory_repository_1.default.create({ title: element.title, order: element.order })));
    const board = new board_model_1.Board({ title, columns: columnsToBoard });
    db_1.dataBase.boards.push(board);
    return board;
};
const update = async ({ id, title, columns, }) => {
    const findedBoardIndex = db_1.dataBase.boards.findIndex((elment) => elment.id === id);
    if (findedBoardIndex !== -1) {
        const findedBoard = db_1.dataBase.boards[findedBoardIndex];
        if (title) {
            findedBoard.title = title;
        }
        if (columns && Array.isArray(columns)) {
            columns.forEach(async (element) => {
                if (element.id) {
                    const foundedColumn = await column_memory_repository_1.default.getById(element.id);
                    if (foundedColumn && foundedColumn instanceof column_model_1.Column) {
                        if (element.title) {
                            foundedColumn.title = element.title;
                        }
                        if (element.order) {
                            foundedColumn.order = element.order;
                        }
                    }
                }
                else {
                    const newColumn = await column_memory_repository_1.default.create({
                        title: element.title,
                        order: element.order,
                    });
                    findedBoard.columns.push(newColumn);
                }
            });
        }
        return findedBoard;
    }
    return undefined;
};
const deletById = async (id) => {
    const findedBoardIndex = db_1.dataBase.boards.findIndex((elment) => elment.id === id);
    if (findedBoardIndex !== -1) {
        const foundBoard = db_1.dataBase.boards[findedBoardIndex];
        foundBoard.columns.forEach(async (element) => {
            await column_memory_repository_1.default.deletById(element.id);
        });
        const tasksIdForBoard = (await task_memory_repository_1.default.getAll(id)).map((element) => element.id);
        if (tasksIdForBoard) {
            tasksIdForBoard.forEach(async (element) => {
                await task_memory_repository_1.default.deletById({ boardId: id, id: element });
            });
        }
        const deletedBoard = (db_1.dataBase.boards.splice(findedBoardIndex, 1)[0]);
        return deletedBoard;
    }
    return undefined;
};
exports.default = { getAll, getById, create, update, deletById };
