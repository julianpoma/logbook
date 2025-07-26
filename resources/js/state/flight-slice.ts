import { type GridApi } from 'ag-grid-community';
import { create } from 'zustand';

type State = {
  entryId: number | null;
  gridRef: GridApi | null;
  selectEntry: (id: number) => void;
  unselectEntity: () => void;
  setGridRef: (ref: GridApi) => void;
};

const useFlightPage = create<State>((set, get) => ({
  entryId: null,
  gridRef: null,

  selectEntry: (id) => set({ entryId: id }),
  unselectEntity: () => {
    const { gridRef } = get();
    if (gridRef) gridRef.deselectAll();
    set({ entryId: null });
  },
  setGridRef: (ref) => set({ gridRef: ref }),
}));

export default useFlightPage;
