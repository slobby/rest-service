import { dataBase } from '../db/db';
import { Board } from './board.model';
import { Task } from '../tasks/task.model';
import { Column } from '../columns/column.model';
import columnsRepo from '../columns/column.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import {
  updateBoard,
  createFromRawBoard,
} from '../../interfaces/boardInterfaces';
import { createColumn, updateColumn } from '../../interfaces/columnInterfaces';

const getAll = async (): Promise<Array<Board>> => dataBase.boards;

const getById = async (id: string): Promise<Board | undefined> =>
  dataBase.boards.find((elment: Board) => elment.id === id);

const create = async ({
  title,
  columns,
}: createFromRawBoard): Promise<Board> => {
  const columnsToBoard: Array<Column> = [];
  columns.forEach(async (element: createColumn) =>
    columnsToBoard.push(
      await columnsRepo.create({ title: element.title, order: element.order })
    )
  );
  const board = new Board({ title, columns: columnsToBoard });
  dataBase.boards.push(board);
  return board;
};

const update = async ({
  id,
  title,
  columns,
}: updateBoard): Promise<Board | undefined> => {
  const findedBoardIndex: number = dataBase.boards.findIndex(
    (elment: Board) => elment.id === id
  );
  if (findedBoardIndex !== -1) {
    const findedBoard: Board = <Board>dataBase.boards[findedBoardIndex];
    if (title) {
      findedBoard.title = title;
    }
    if (columns && Array.isArray(columns)) {
      columns.forEach(async (element: updateColumn) => {
        if (element.id) {
          const foundedColumn: Column | undefined = await columnsRepo.getById(
            element.id
          );
          if (foundedColumn && foundedColumn instanceof Column) {
            if (element.title) {
              foundedColumn.title = element.title;
            }
            if (element.order) {
              foundedColumn.order = element.order;
            }
          }
        } else {
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

const deletById = async (id: string): Promise<Board | undefined> => {
  const findedBoardIndex: number = dataBase.boards.findIndex(
    (elment: Board) => elment.id === id
  );
  if (findedBoardIndex !== -1) {
    const foundBoard: Board = <Board>dataBase.boards[findedBoardIndex];
    foundBoard.columns.forEach(async (element: Column) => {
      await columnsRepo.deletById(element.id);
    });
    const tasksIdForBoard: Array<string> = (await tasksRepo.getAll(id)).map(
      (element: Task) => element.id
    );
    if (tasksIdForBoard) {
      tasksIdForBoard.forEach(async (element: string) => {
        await tasksRepo.deletById({ boardId: id, id: element });
      });
    }
    const deletedBoard: Board = <Board>(
      dataBase.boards.splice(findedBoardIndex, 1)[0]
    );
    return deletedBoard;
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
