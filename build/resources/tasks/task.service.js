import tasksRepo from './task.memory.repository.js';
const getAll = async (boardId) => {
    const tasks = await tasksRepo.getAll(boardId);
    return tasks.map((element) => element.toResponse());
};
const getById = async ({ boardId, id, }) => {
    const task = await tasksRepo.getById({ boardId, id });
    if (task) {
        return task.toResponse();
    }
    return undefined;
};
const create = async ({ title, order, description, userId, boardId, columnId, }) => {
    const task = await tasksRepo.create({
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
    const task = await tasksRepo.update({
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
    const task = await tasksRepo.deletById({ boardId, id });
    if (task) {
        return task.toResponse();
    }
    return undefined;
};
export default { getAll, getById, create, update, deletById };
