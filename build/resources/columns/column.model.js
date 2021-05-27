"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = require("uuid");
class Column {
    constructor({ title = 'Column', order = 0 }) {
        this.id = uuid_1.v4();
        this.title = title;
        this.order = order;
    }
    toResponse() {
        const viewcolumn = {
            id: this.id,
            title: this.title,
            order: this.order,
        };
        return viewcolumn;
    }
}
exports.Column = Column;
