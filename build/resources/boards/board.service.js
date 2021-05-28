import boardsRepo from './board.memory.repository.js';
const getAll = async () => {
    const boards = await boardsRepo.getAll();
    return boards.map((element) => element.toResponse());
};
const getById = async (id) => {
    const board = await boardsRepo.getById(id);
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
const create = async ({ title, columns, }) => {
    const board = await boardsRepo.create({ title, columns });
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
const update = async ({ id, title, columns, }) => {
    const board = await boardsRepo.update({
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
    const board = await boardsRepo.deletById(id);
    if (board) {
        return board.toResponse();
    }
    return undefined;
};
export default { getAll, getById, create, update, deletById };
