import { dataBase } from '../db/db';
import { Column } from './column.model';
import { Task } from '../tasks/task.model';
import { createColumn, updateColumn } from '../../interfaces/columnInterfaces';

const getAll = async (): Promise<Array<Column>> => dataBase.columns;

const getById = async (id: string): Promise<Column | undefined> =>
  dataBase.columns.find((elment: Column) => elment.id === id);

const create = async ({ title, order }: createColumn): Promise<Column> => {
  const column: Column = new Column({ title, order });
  dataBase.columns.push(column);
  return column;
};

const update = async ({
  id,
  title,
  order,
}: updateColumn): Promise<Column | undefined> => {
  const findedColumnIndex = dataBase.columns.findIndex(
    (elment: Column) => elment.id === id
  );
  if (findedColumnIndex !== -1) {
    const foundedColumn: Column = <Column>dataBase.columns[findedColumnIndex];
    foundedColumn.title = title;
    foundedColumn.order = order;
    return foundedColumn;
  }
  return undefined;
};

const deletById = async (id: string): Promise<Column | undefined> => {
  const findedColumnIndex = dataBase.columns.findIndex(
    (elment: Column) => elment.id === id
  );
  if (findedColumnIndex !== -1) {
    dataBase.tasks.forEach((element: Task) => {
      const localElement: Task = element;
      if (localElement.columnId === id) {
        localElement.columnId = null;
      }
    });
    const deletedColumn: Column = <Column>(
      dataBase.columns.splice(findedColumnIndex, 1)[0]
    );
    return deletedColumn;
  }
  return undefined;
};

export default { getAll, getById, create, update, deletById };
