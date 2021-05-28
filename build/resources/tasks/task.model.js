import { v4 as uuid } from 'uuid';
export class Task {
    constructor({ title = 'Title', order = 0, description = 'description', userId = null, boardId = null, columnId = null, }) {
        this.id = uuid();
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
