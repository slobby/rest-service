const uuid = require('uuid').v4;

class Task {
  constructor({
    id = uuid(),
    title = 'Title',
    order = 0,
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null} = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
