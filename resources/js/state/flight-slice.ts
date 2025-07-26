import { create } from 'zustand';

type State = {
  entryId: number | null;
  selectEntry: (id: number) => void;
  unselectEntity: () => void;
};

const useFlightPage = create<State>((set) => ({
  entryId: null,
  selectEntry: (id) => set({ entryId: id }),
  unselectEntity: () => set({ entryId: null }),
}));

export default useFlightPage;
