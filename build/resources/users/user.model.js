"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    constructor({ name = 'USER', login = 'user', password = 'P@55w0rd', }) {
        this.id = uuid_1.v4();
        this.name = name;
        this.login = login;
        this.password = password;
    }
    toResponse() {
        const viewuser = {
            id: this.id,
            name: this.name,
            login: this.login,
        };
        return viewuser;
    }
}
exports.User = User;
