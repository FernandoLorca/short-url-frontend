import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserApiResponse } from '@/types';

interface AuthStore {
  token: string | null;
  isAuth: boolean;
  setToken: (token: string) => void;
  setIsAuth: (isAuth: boolean) => void;
}

interface ProfileStore {
  user: IUserApiResponse;
  setUser: (profile: IUserApiResponse) => void;
}

const useProfileStore = create<ProfileStore>(set => ({
  user: {
    ok: false,
    status: 0,
    message: '',
    user: null,
    data: null,
  },
  setUser: user => set(state => ({ user })),
}));

const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      token: null,
      isAuth: false,
      setToken: token => set(state => ({ token })),
      setIsAuth: isAuth => set(state => ({ isAuth })),
    }),
    {
      name: 'auth',
    }
  )
);

export const authStatesStore = {
  useAuthStore,
  useProfileStore,
};
