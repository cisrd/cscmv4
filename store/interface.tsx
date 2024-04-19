import { create } from "zustand";

export const interfaceStore = create((set) => ({
  interfaceZustand: {
    IsSidebarVisible: true,
  },
  updateInterface: (newInterfac: any) =>
    set((state: any) => ({
      interfaceZustand: { ...state.interfaceZustand, ...newInterfac },
    })),
}));
