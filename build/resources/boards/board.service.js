"use strict";
const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const getAll = async () => {
    const boards = await boardsRepo.getAll();
    return boards.map(Board.toResponse);
};
const getById = async (id) => {
    const board = await boardsRepo.getById(id);
    if (board) {
        return Board.toResponse(board);
    }
    return undefined;
};
const create = async ({ title, columns }) => {
    const board = await boardsRepo.create({ title, columns });
    if (board) {
        return Board.toResponse(board);
    }
    return undefined;
};
const update = async ({ id, title, columns }) => {
    const board = await boardsRepo.update({ id, title, columns });
    if (board) {
        return Board.toResponse(board);
    }
    return undefined;
};
const deletById = async (id) => {
    const board = await boardsRepo.deletById(id);
    if (board) {
        return Board.toResponse(board);
    }
    return undefined;
};
module.exports = { getAll, getById, create, update, deletById };
