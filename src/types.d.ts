interface User {
  id: number;
  username: string;
  email: string;
  token: string | undefined;
}

interface URLs {
  id: number;
  original: string;
  short: string;
  customLink: string | null;
}

export interface IUserApiResponse {
  ok: boolean;
  status: Number;
  message: string;
  user?: User | null;
  urls?: URLs[] | null;
}
