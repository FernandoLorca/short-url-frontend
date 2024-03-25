interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface IApiResponse {
  ok: boolean;
  status: Number;
  message: string;
  user: User | null;
  data?: object | null;
  loading: boolean;
}
