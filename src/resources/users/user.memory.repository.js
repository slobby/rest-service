const dataBase = require("../db/db");
const User = require('./user.model');

const getAll = async () => dataBase.users;

const getById = async (id) => dataBase.users.find((elment) => elment.id === id);

const create = async ({name , login , password}) => {
  if (dataBase.users.find((elment) => elment.login === login)) {
    return undefined;
  }
  const user = new User({name, login, password});
  dataBase.users.push(user);
  return user;
};

const update = async ({id, name , login, password}) => {
  const findedUserIndex = dataBase.users.findIndex((elment) => elment.id === id);
  if (findedUserIndex !== -1) {
  const updatedUser = {...dataBase.users[findedUserIndex], name, login, password };
  dataBase.users.splice(findedUserIndex, 1, updatedUser);
  return updatedUser;
  }
  return undefined;
};

const deletById = async (id) => {
  const findedUserIndex = dataBase.users.findIndex((elment) => elment.id === id);
  if (findedUserIndex !== -1) {
  /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["element"] }] */
  dataBase.tasks.forEach((element) => {
    if (element.userId === id) {
      element.userId = null;
    }
  });
  const deletedUser = dataBase.users.splice(findedUserIndex, 1)
  return deletedUser;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };