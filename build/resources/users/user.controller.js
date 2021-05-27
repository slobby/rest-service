"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = __importDefault(require("./user.service"));
const getAll = async (_, res, next) => {
    try {
        const users = await user_service_1.default.getAll();
        res.status(http_status_codes_1.default.OK).json(users);
    }
    catch (error) {
        next(new http_errors_1.default.NotFound('Not found users.'));
    }
};
const create = async (req, res, next) => {
    try {
        const { name, login, password } = req.body;
        if (!name || !login || !password) {
            throw new http_errors_1.default.BadRequest('Received not all fields for user.');
        }
        const user = await user_service_1.default.create({
            name,
            login,
            password,
        });
        if (user) {
            res.status(http_status_codes_1.default.CREATED).json(user);
        }
        else {
            throw new http_errors_1.default.InternalServerError('Couldn`t create user.');
        }
    }
    catch (error) {
        next(error);
    }
};
const getById = async (req, res, next) => {
    try {
        const id = req.params['userId'];
        if (!id) {
            throw new http_errors_1.default.BadRequest('Don`t receive user id.');
        }
        const user = await user_service_1.default.getById(id);
        if (user) {
            res.status(http_status_codes_1.default.OK).json(user);
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
        const id = req.params['userId'];
        const { name, login, password } = req.body;
        if (!id || !name || !login || !password) {
            throw new http_errors_1.default.BadRequest('Received not all fields for user.');
        }
        const user = await user_service_1.default.update({
            id,
            name,
            login,
            password,
        });
        if (user) {
            res.status(http_status_codes_1.default.OK).json(user);
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
        const id = req.params['userId'];
        if (!id) {
            throw new http_errors_1.default.BadRequest('Don`t receive user id.');
        }
        const user = await user_service_1.default.deletById(id);
        if (user) {
            res.status(http_status_codes_1.default.NO_CONTENT).json(user);
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
