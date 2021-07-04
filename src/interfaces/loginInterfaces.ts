export type loginReqBody = {
  login: string;
  password: string;
};

export type loginResBody = {
  token: string;
};

export type JWTPayload = {
  id: string;
  login: string;
};
