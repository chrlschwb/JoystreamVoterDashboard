import { create } from 'zustand';

import { ElectedCouncil } from '@/types';

export interface SelectedCouncilState {
  council?: ElectedCouncil;
  setCouncil: (council?: ElectedCouncil) => void;
}

export const useSelectedCouncil = create<SelectedCouncilState>((set) => ({
  setCouncil: (council) => set(() => ({ council })),
}));
