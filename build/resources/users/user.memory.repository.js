import { dataBase } from '../db/db.js';
import { User } from './user.model.js';
const getAll = async () => dataBase.users;
const getById = async (id) => dataBase.users.find((elment) => elment.id === id);
const create = async ({ name, login, password }) => {
    const user = new User({ name, login, password });
    dataBase.users.push(user);
    return user;
};
const update = async ({ id, name, login, password, }) => {
    const findedUserIndex = dataBase.users.findIndex((elment) => elment.id === id);
    if (findedUserIndex !== -1) {
        const foundedUser = dataBase.users[findedUserIndex];
        foundedUser.name = name;
        foundedUser.login = login;
        foundedUser.password = password;
        return foundedUser;
    }
    return undefined;
};
const deletById = async (id) => {
    const findedUserIndex = dataBase.users.findIndex((elment) => elment.id === id);
    if (findedUserIndex !== -1) {
        dataBase.tasks.forEach((element) => {
            const localElement = element;
            if (localElement.userId === id) {
                localElement.userId = null;
            }
        });
        const deletedUser = (dataBase.users.splice(findedUserIndex, 1)[0]);
        return deletedUser;
    }
    return undefined;
};
export default { getAll, getById, create, update, deletById };
