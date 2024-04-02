import { create } from 'zustand';

interface AuthGlobalState {
  message: string;
  addWordToMessage: () => void;
}

export const useAuthGlobalStatesStore = create<AuthGlobalState>(set => ({
  message: 'Hola. ',
  addWordToMessage: () =>
    set(state => ({ message: state.message + '¿Cómo estás?' })),
}));
