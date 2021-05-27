"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_memory_repository_1 = __importDefault(require("./user.memory.repository"));
const getAll = async () => {
    const users = await user_memory_repository_1.default.getAll();
    return users.map((element) => element.toResponse());
};
const getById = async (id) => {
    const user = await user_memory_repository_1.default.getById(id);
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
const create = async ({ name, login, password, }) => {
    const user = await user_memory_repository_1.default.create({ name, login, password });
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
const update = async ({ id, name, login, password, }) => {
    const user = await user_memory_repository_1.default.update({
        id,
        name,
        login,
        password,
    });
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
const deletById = async (id) => {
    const user = await user_memory_repository_1.default.deletById(id);
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
exports.default = { getAll, create, getById, update, deletById };
