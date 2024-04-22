export interface User {
  id: number;
  username: string;
  email: string;
  token: string | null;
}

export interface Url {
  id: number;
  original: string;
  short: string;
  customLink: string | null;
}

export interface IApiResponses {
  ok: boolean;
  status: number;
  message: string;
  user?: User;
  urls?: Url[] | undefined;
}
