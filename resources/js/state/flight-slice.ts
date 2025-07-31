import { type GridApi } from 'ag-grid-community';
import { create } from 'zustand';

type State = {
  entryId: number | 'new' | null;
  gridRef: GridApi | null;
  createEntry: () => void;
  selectEntry: (id: number) => void;
  setGridRef: (ref: GridApi) => void;
  unselectEntity: () => void;
};

const useFlightPage = create<State>((set, get) => ({
  entryId: null,
  gridRef: null,

  createEntry: () => {
    const { gridRef } = get();
    if (gridRef) gridRef.deselectAll();
    set({ entryId: 'new' });
  },
  selectEntry: (id) => set({ entryId: id }),
  setGridRef: (ref) => set({ gridRef: ref }),
  unselectEntity: () => {
    const { gridRef } = get();
    if (gridRef) gridRef.deselectAll();
    set({ entryId: null });
  },
}));

export default useFlightPage;
