import { create } from 'zustand';
import { IApiResponses, User, Url } from '@/types';

interface SetUserAndUrl extends IApiResponses {
  setUser: (user: User) => void;
  setUrl: (url: Url[]) => void;
}

const useUserUrlsStateStore = create<SetUserAndUrl>(set => ({
  ok: false,
  status: 0,
  message: '',
  user: {
    id: 0,
    username: '',
    email: '',
    token: null,
  },
  urls: [
    {
      id: 0,
      original: '',
      short: '',
      customLink: null,
    },
  ],
  setUser: user => set(state => ({ user })),
  setUrl: urls => set(state => ({ urls })),
}));

export const userUrlsStatesStore = {
  useUserUrlsStateStore,
};
