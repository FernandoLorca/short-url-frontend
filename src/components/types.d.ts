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

export interface IApiResponse {
  ok: boolean;
  status: Number;
  message: string;
  user: User | null;
  data?: Data | null;
}
