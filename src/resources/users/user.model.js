/**
 * User model
 * @module user-model
 */

const uuid = require('uuid').v4;

/**
 * createUser type definition
 * @global
 * @typedef {Object} createUser Contains parameters for creating user instance
 * @property {string} [id]      Unique user id
 * @property {string} name      User name
 * @property {string} login     User loggin
 * @property {string} password  User password
 */

/**
 * viewUser type definition
 * @global
 * @typedef {Object} viewUser   Contains user`s parameters for responce
 * @property {string} id        Unique user id
 * @property {string} name      User name
 * @property {string} login     User loggin
 */

/** Class representing a user.
 * @global
 */
class User {
  /**
   * Create a new user instance.
   * @param {createUser} createUser Parameters for creating a new user instance
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return a representing of user for response
   * @static
   * @memberof User
   * @param {User} user a user
   * @returns {viewUser} user`s parameters for responce
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
