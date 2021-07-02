import boardsRepo from './board.repository.js';
import { Board } from './board.model.js';
import {
  updateBoard,
  viewBoard,
  createFromRawBoard,
} from '../../interfaces/boardInterfaces.js';

const getAll = async (): Promise<Array<viewBoard>> => {
  const boards: Array<Board> = await boardsRepo.getAll();
  return boards.map((element: Board): viewBoard => element.toResponse());
};

const getById = async (id: string): Promise<viewBoard | undefined> => {
  const board: Board | undefined = await boardsRepo.getById(id);
  if (board) {
    return board.toResponse();
  }
  return undefined;
};

const create = async ({
  title,
  columns,
}: createFromRawBoard): Promise<viewBoard | undefined> => {
  const board: Board | undefined = await boardsRepo.create({ title, columns });
  if (board) {
    return board.toResponse();
  }
  return undefined;
};

const update = async ({
  id,
  title,
  columns,
}: updateBoard): Promise<viewBoard | undefined> => {
  const board: Board | undefined = await boardsRepo.update({
    id,
    title,
    columns,
  });
  if (board) {
    return board.toResponse();
  }
  return undefined;
};

const deletById = async (id: string): Promise<viewBoard | undefined> => {
  const board: Board | undefined = await boardsRepo.deletById(id);
  if (board) {
    return board.toResponse();
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
