import { dataBase } from '../db/db.js';
import { Board } from './board.model.js';
import { Column } from '../columns/column.model.js';
import columnsRepo from '../columns/column.memory.repository.js';
import tasksRepo from '../tasks/task.memory.repository.js';
const getAll = async () => dataBase.boards;
const getById = async (id) => dataBase.boards.find((elment) => elment.id === id);
const create = async ({ title, columns, }) => {
    const columnsToBoard = [];
    columns.forEach(async (element) => columnsToBoard.push(await columnsRepo.create({ title: element.title, order: element.order })));
    const board = new Board({ title, columns: columnsToBoard });
    dataBase.boards.push(board);
    return board;
};
const update = async ({ id, title, columns, }) => {
    const findedBoardIndex = dataBase.boards.findIndex((elment) => elment.id === id);
    if (findedBoardIndex !== -1) {
        const findedBoard = dataBase.boards[findedBoardIndex];
        if (title) {
            findedBoard.title = title;
        }
        if (columns && Array.isArray(columns)) {
            columns.forEach(async (element) => {
                if (element.id) {
                    const foundedColumn = await columnsRepo.getById(element.id);
                    if (foundedColumn && foundedColumn instanceof Column) {
                        if (element.title) {
                            foundedColumn.title = element.title;
                        }
                        if (element.order) {
                            foundedColumn.order = element.order;
                        }
                    }
                }
                else {
                    const newColumn = await columnsRepo.create({
                        title: element.title,
                        order: element.order,
                    });
                    findedBoard.columns.push(newColumn);
                }
            });
        }
        return findedBoard;
    }
    return undefined;
};
const deletById = async (id) => {
    const findedBoardIndex = dataBase.boards.findIndex((elment) => elment.id === id);
    if (findedBoardIndex !== -1) {
        const foundBoard = dataBase.boards[findedBoardIndex];
        foundBoard.columns.forEach(async (element) => {
            await columnsRepo.deletById(element.id);
        });
        const tasksIdForBoard = (await tasksRepo.getAll(id)).map((element) => element.id);
        if (tasksIdForBoard) {
            tasksIdForBoard.forEach(async (element) => {
                await tasksRepo.deletById({ boardId: id, id: element });
            });
        }
        const deletedBoard = (dataBase.boards.splice(findedBoardIndex, 1)[0]);
        return deletedBoard;
    }
    return undefined;
};
export default { getAll, getById, create, update, deletById };
