import { getRepository } from 'typeorm';
import { BoardDTO } from './board.entity.js';
import { ColumnDTO } from '../columns/column.entity.js';
import { Board } from './board.model.js';
import { Column } from '../columns/column.model.js';
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

const getById = async (id: string): Promise<Board | undefined> => {
  const boardRepository = getRepository(BoardDTO);
  const findedBoardDTO: BoardDTO | undefined = (
    await boardRepository.findByIds([id])
  )[0];
  if (findedBoardDTO) {
    const newBoard = new Board();
    newBoard.id = findedBoardDTO.id;
    newBoard.title = findedBoardDTO.title;
    newBoard.columns = findedBoardDTO.columns.map(
      (element) => new Column({ ...element })
    );
    return newBoard;
  }
  return undefined;
};

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
  const boardRepository = getRepository(BoardDTO);
  const findedBoardDTO: BoardDTO | undefined = (
    await boardRepository.findByIds([id])
  )[0];
  if (findedBoardDTO) {
    const columnsDTOToBoard: Array<ColumnDTO> = columns.map(
      (element: updateColumn) => {
        const newColumnDTO: ColumnDTO = new ColumnDTO();
        return Object.assign(newColumnDTO, element);
      }
    );
    findedBoardDTO.title = title;
    findedBoardDTO.columns = columnsDTOToBoard;
    await boardRepository.save(findedBoardDTO);
    const findedBoard = new Board();
    findedBoard.id = findedBoardDTO.id;
    findedBoard.title = findedBoardDTO.title;
    findedBoard.columns = findedBoardDTO.columns.map(
      (element) => new Column({ ...element })
    );
    return findedBoard;
  }
  return undefined;
};

const deletById = async (id: string): Promise<Board | undefined> => {
  const boardRepository = getRepository(BoardDTO);
  const findedBoardDTO: BoardDTO | undefined = (
    await boardRepository.findByIds([id])
  )[0];
  if (findedBoardDTO) {
    await boardRepository.remove(findedBoardDTO);
    const newBoard = new Board();
    newBoard.id = findedBoardDTO.id;
    newBoard.title = findedBoardDTO.title;
    newBoard.columns = findedBoardDTO.columns.map(
      (element) => new Column({ ...element })
    );
    return newBoard;
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
