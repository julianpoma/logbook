import { create } from 'zustand';

const useFlightPage = create((set, get) => ({
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