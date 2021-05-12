const uuid = require('uuid').v4;

class Column {
  constructor({
    id = uuid(),
    title = 'Title',
    order = 0
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order
  }

  static toResponse(column) {
    return column;
  }
}

module.exports = Column;
