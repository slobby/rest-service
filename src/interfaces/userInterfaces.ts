export interface IModel<T> {
  toResponse(): T;
}

export type createUser = {
  name: string;
  login: string;
  password: string;
};

export type updateUser = {
  id: string;
  name: string;
  login: string;
  password: string;
};

export type viewUser = {
  id: string;
  name: string;
  login: string;
};
