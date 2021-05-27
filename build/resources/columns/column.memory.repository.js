"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const column_model_1 = require("./column.model");
const getAll = async () => db_1.dataBase.columns;
const getById = async (id) => db_1.dataBase.columns.find((elment) => elment.id === id);
const create = async ({ title, order }) => {
    const column = new column_model_1.Column({ title, order });
    db_1.dataBase.columns.push(column);
    return column;
};
const update = async ({ id, title, order, }) => {
    const findedColumnIndex = db_1.dataBase.columns.findIndex((elment) => elment.id === id);
    if (findedColumnIndex !== -1) {
        const foundedColumn = db_1.dataBase.columns[findedColumnIndex];
        foundedColumn.title = title;
        foundedColumn.order = order;
        return foundedColumn;
    }
    return undefined;
};
const deletById = async (id) => {
    const findedColumnIndex = db_1.dataBase.columns.findIndex((elment) => elment.id === id);
    if (findedColumnIndex !== -1) {
        db_1.dataBase.tasks.forEach((element) => {
            const localElement = element;
            if (localElement.columnId === id) {
                localElement.columnId = null;
            }
        });
        const deletedColumn = (db_1.dataBase.columns.splice(findedColumnIndex, 1)[0]);
        return deletedColumn;
    }
    return undefined;
};
exports.default = { getAll, getById, create, update, deletById };
