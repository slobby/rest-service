"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const user_model_1 = require("./user.model");
const getAll = async () => db_1.dataBase.users;
const getById = async (id) => db_1.dataBase.users.find((elment) => elment.id === id);
const create = async ({ name, login, password }) => {
    const user = new user_model_1.User({ name, login, password });
    db_1.dataBase.users.push(user);
    return user;
};
const update = async ({ id, name, login, password, }) => {
    const findedUserIndex = db_1.dataBase.users.findIndex((elment) => elment.id === id);
    if (findedUserIndex !== -1) {
        const foundedUser = db_1.dataBase.users[findedUserIndex];
        foundedUser.name = name;
        foundedUser.login = login;
        foundedUser.password = password;
        return foundedUser;
    }
    return undefined;
};
const deletById = async (id) => {
    const findedUserIndex = db_1.dataBase.users.findIndex((elment) => elment.id === id);
    if (findedUserIndex !== -1) {
        db_1.dataBase.tasks.forEach((element) => {
            const localElement = element;
            if (localElement.userId === id) {
                localElement.userId = null;
            }
        });
        const deletedUser = (db_1.dataBase.users.splice(findedUserIndex, 1)[0]);
        return deletedUser;
    }
    return undefined;
};
exports.default = { getAll, getById, create, update, deletById };
