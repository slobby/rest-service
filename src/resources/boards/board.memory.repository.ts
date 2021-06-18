import { getRepository } from 'typeorm';
import { BoardDTO } from './board.entity.js';
import { ColumnDTO } from '../columns/column.entity.js';
import { dataBase } from '../db/db.js';
import { Board } from './board.model.js';
import { Task } from '../tasks/task.model.js';
import { Column } from '../columns/column.model.js';
import columnsRepo from '../columns/column.memory.repository.js';
import tasksRepo from '../tasks/task.memory.repository.js';
import {
  updateBoard,
  createFromRawBoard,
} from '../../interfaces/boardInterfaces.js';
import {
  createColumn,
  updateColumn,
} from '../../interfaces/columnInterfaces.js';

const getAll = async (): Promise<Array<Board>> => {
  const boardRepository = getRepository(BoardDTO);
  const boardsDTO = await boardRepository.find();
  return boardsDTO.map((boardDTO) => {
    const newBoard = new Board();
    newBoard.id = boardDTO.id;
    newBoard.title = boardDTO.title;
    newBoard.columns = boardDTO.columns.map(
      (element) => new Column({ ...element })
    );
    return newBoard;
  });
};

const getById = async (id: string): Promise<Board | undefined> =>
  dataBase.boards.find((elment: Board) => elment.id === id);

const create = async ({
  title,
  columns,
}: createFromRawBoard): Promise<Board> => {
  const boardRepository = getRepository(BoardDTO);
  const columnsDTOToBoard: Array<ColumnDTO> = columns.map(
    (element: createColumn) => {
      const newColumnDTO: ColumnDTO = new ColumnDTO();
      return Object.assign(newColumnDTO, element);
    }
  );
  const boardDTO = new BoardDTO();
  boardDTO.title = title;
  boardDTO.columns = columnsDTOToBoard;
  const newBoardDTO = await boardRepository.save(boardDTO);
  const newBoard = new Board();
  newBoard.id = newBoardDTO.id;
  newBoard.title = newBoardDTO.title;
  newBoard.columns = newBoardDTO.columns.map(
    (element) => new Column({ ...element })
  );
  return newBoard;
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
