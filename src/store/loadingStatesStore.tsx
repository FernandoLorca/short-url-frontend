import { create } from 'zustand';

interface IsLoading {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useIsLoading = create<IsLoading>(set => ({
  isLoading: false,
  setIsLoading: isLoading => set(state => ({ isLoading })),
}));

export const loadingStatesStore = {
  useIsLoading,
};
