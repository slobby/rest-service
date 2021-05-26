import { v4 as uuid } from 'uuid';
class User {
    constructor({ name = 'USER', login = 'user', password = 'P@55w0rd', }) {
        this.id = uuid();
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
module.exports = User;
