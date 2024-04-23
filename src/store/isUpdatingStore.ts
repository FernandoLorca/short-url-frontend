import { create } from 'zustand';

interface IsUpdatingStore {
  isUpdating: boolean;
  urlId: number | null;
  setIsUpdating: (isUpdating: boolean) => void;
  setUrlId: (urlId: number | null) => void;
}

const useIsUpdating = create<IsUpdatingStore>(set => ({
  isUpdating: false,
  urlId: null,
  setIsUpdating: isUpdating => set(state => ({ isUpdating })),
  setUrlId: urlId => set(state => ({ urlId })),
}));

export const isUpdatingStore = { useIsUpdating };
