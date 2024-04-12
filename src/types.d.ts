interface User {
  id: number;
  username: string;
  email: string;
  token: string | undefined;
}

interface Data {
  id: number;
  originalUrl: string;
  shortUrl: string;
  customLink: string | null;
}

export interface IUserApiResponse {
  ok: boolean;
  status: Number;
  message: string;
  user?: User | null;
  urls?: Data | null;
}
