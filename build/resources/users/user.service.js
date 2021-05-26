"use strict";
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const getAll = async () => {
    const users = await usersRepo.getAll();
    return users.map(User.toResponse);
};
const getById = async (id) => {
    const user = await usersRepo.getById(id);
    if (user) {
        return User.toResponse(user);
    }
    return undefined;
};
const create = async ({ name, login, password }) => {
    const user = await usersRepo.create({ name, login, password });
    if (user) {
        return User.toResponse(user);
    }
    return undefined;
};
const update = async ({ id, name, login, password }) => {
    const user = await usersRepo.update({ id, name, login, password });
    if (user) {
        return User.toResponse(user);
    }
    return undefined;
};
const deletById = async (id) => {
    const user = await usersRepo.deletById(id);
    if (user) {
        return User.toResponse(user);
    }
    return undefined;
};
module.exports = { getAll, getById, create, update, deletById };
