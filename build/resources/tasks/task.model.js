"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const uuid_1 = require("uuid");
class Task {
    constructor({ title = 'Title', order = 0, description = 'description', userId = null, boardId = null, columnId = null, }) {
        this.id = uuid_1.v4();
        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
    toResponse() {
        const viewtask = {
            id: this.id,
            title: this.title,
            order: this.order,
            description: this.description,
            userId: this.userId,
            boardId: this.boardId,
            columnId: this.columnId,
        };
        return viewtask;
    }
}
exports.Task = Task;
