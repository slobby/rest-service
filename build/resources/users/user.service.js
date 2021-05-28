import usersRepo from './user.memory.repository.js';
const getAll = async () => {
    const users = await usersRepo.getAll();
    return users.map((element) => element.toResponse());
};
const getById = async (id) => {
    const user = await usersRepo.getById(id);
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
const create = async ({ name, login, password, }) => {
    const user = await usersRepo.create({ name, login, password });
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
const update = async ({ id, name, login, password, }) => {
    const user = await usersRepo.update({
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
    const user = await usersRepo.deletById(id);
    if (user) {
        return user.toResponse();
    }
    return undefined;
};
export default { getAll, create, getById, update, deletById };
