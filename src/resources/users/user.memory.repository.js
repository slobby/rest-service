/**
 * User repository module
 * @module user-repository
 */

const dataBase = require('../db/db');
const User = require('./user.model');

/**
 * createUser type definition
 * @ignore
 * @typedef {Object} createUser Contains parameters for creating user instance
 * @property {string} [id]      Unique user id
 * @property {string} name      User name
 * @property {string} login     User loggin
 * @property {string} password  User password
 */

/**
 * Returns Promise with the list of all users instances from DataBase
 * @async
 * @returns {Promise<Array<User>>} Promise with the list of all users instances
 */
const getAll = async () => dataBase.users;

/**
 * Returns Promise with the user instance found by its Id
 * @async
 * @param {string} id The Id of user
 * @returns {Promise<User|undefined>} Promise with the found user instance if success, or undefinded otherwise
 */
const getById = async (id) => dataBase.users.find((elment) => elment.id === id);

/**
 * Returns Promise with the new user instance, created from input parameters
 * @async
 * @param {createUser} createUser Parameters for creating user instance
 * @returns {Promise<User|undefined>} Promise with the new user instance if success, or undefinded otherwise
 */
const create = async ({ name, login, password }) => {
  if (dataBase.users.find((elment) => elment.login === login)) {
    return undefined;
  }
  const user = new User({ name, login, password });
  dataBase.users.push(user);
  return user;
};

/**
 * Returns Promise with the updated user instance
 * @param {createUser} updateUser Parameters for update user instance
 * @returns {Promise<User|undefined>} Promise with the updated user instance if success, or undefinded otherwise
 */
const update = async ({ id, name, login, password }) => {
  const findedUserIndex = dataBase.users.findIndex(
    (elment) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    const updatedUser = {
      ...dataBase.users[findedUserIndex],
      name,
      login,
      password,
    };
    dataBase.users.splice(findedUserIndex, 1, updatedUser);
    return updatedUser;
  }
  return undefined;
};

/**
 * Returns Promise with deleted user instance by Id
 * @param {string} id The Id of user
 * @returns {Promise<User|undefined>} Promise with deleted user instance if success, or undefinded otherwise
 */
const deletById = async (id) => {
  const findedUserIndex = dataBase.users.findIndex(
    (elment) => elment.id === id
  );
  if (findedUserIndex !== -1) {
    dataBase.tasks.forEach((element) => {
      const localElement = element;
      if (localElement.userId === id) {
        localElement.userId = null;
      }
    });
    const deletedUser = dataBase.users.splice(findedUserIndex, 1);
    return deletedUser;
  }
  return undefined;
};

module.exports = { getAll, getById, create, update, deletById };
