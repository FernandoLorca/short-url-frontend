import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserApiResponse } from '@/types';

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
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
      setToken: token => set(state => ({ token })),
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
