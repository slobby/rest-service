import { dataBase } from '../db/db.js';
import { Column } from './column.model.js';
const getAll = async () => dataBase.columns;
const getById = async (id) => dataBase.columns.find((elment) => elment.id === id);
const create = async ({ title, order }) => {
    const column = new Column({ title, order });
    dataBase.columns.push(column);
    return column;
};
const update = async ({ id, title, order, }) => {
    const findedColumnIndex = dataBase.columns.findIndex((elment) => elment.id === id);
    if (findedColumnIndex !== -1) {
        const foundedColumn = dataBase.columns[findedColumnIndex];
        foundedColumn.title = title;
        foundedColumn.order = order;
        return foundedColumn;
    }
    return undefined;
};
const deletById = async (id) => {
    const findedColumnIndex = dataBase.columns.findIndex((elment) => elment.id === id);
    if (findedColumnIndex !== -1) {
        dataBase.tasks.forEach((element) => {
            const localElement = element;
            if (localElement.columnId === id) {
                localElement.columnId = null;
            }
        });
        const deletedColumn = (dataBase.columns.splice(findedColumnIndex, 1)[0]);
        return deletedColumn;
    }
    return undefined;
};
export default { getAll, getById, create, update, deletById };
