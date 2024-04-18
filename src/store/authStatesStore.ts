import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  isAuth: boolean;
  setToken: (token: string | null) => void;
  setIsAuth: (isAuth: boolean) => void;
}

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
};
