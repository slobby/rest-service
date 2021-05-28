import { v4 as uuid } from 'uuid';
export class Column {
    constructor({ title = 'Column', order = 0 }) {
        this.id = uuid();
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
