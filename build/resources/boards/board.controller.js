"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const board_service_1 = __importDefault(require("./board.service"));
const getAll = async (_, res, next) => {
    try {
        const boards = await board_service_1.default.getAll();
        res.status(http_status_codes_1.default.OK).json(boards);
    }
    catch (error) {
        next(new http_errors_1.default.NotFound('Not found boards.'));
    }
};
const create = async (req, res, next) => {
    try {
        const { title, columns } = req.body;
        if (!title || !columns) {
            throw new http_errors_1.default.BadRequest('Received not all fields for board.');
        }
        const board = await board_service_1.default.create({
            title,
            columns,
        });
        if (board) {
            res.status(http_status_codes_1.default.CREATED).json(board);
        }
        else {
            throw new http_errors_1.default.InternalServerError('Couldn`t create board.');
        }
    }
    catch (error) {
        next(error);
    }
};
const getById = async (req, res, next) => {
    try {
        const id = req.params['boardId'];
        if (!id) {
            throw new http_errors_1.default.BadRequest('Don`t receive board id.');
        }
        const board = await board_service_1.default.getById(id);
        if (board) {
            res.status(http_status_codes_1.default.OK).json(board);
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
        const id = req.params['boardId'];
        const { title, columns } = req.body;
        if (!id || !title || !columns) {
            throw new http_errors_1.default.BadRequest('Received not all fields for board.');
        }
        const board = await board_service_1.default.update({
            id,
            title,
            columns,
        });
        if (board) {
            res.status(http_status_codes_1.default.OK).json(board);
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
        const id = req.params['boardId'];
        if (!id) {
            throw new http_errors_1.default.BadRequest('Don`t receive board id.');
        }
        const board = await board_service_1.default.deletById(id);
        if (board) {
            res.status(http_status_codes_1.default.NO_CONTENT).json(board);
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
