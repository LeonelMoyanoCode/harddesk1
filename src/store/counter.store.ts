import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

export interface CounterState {
  addItem: (item: any) => void; // Definir el tipo de item que quieras, por ejemplo: { variantId: string, productId: string, ... }
  count: number;
  increment: () => void;
  decrement: () => void;
}

const storeApi: StateCreator<CounterState> = (set) => ({
  count: 1,
  increment: () => {
    set((state) => ({ count: state.count + 1 }));
  },
  decrement: () => {
    set((state) => ({ count: Math.max(1, state.count - 1) }));
  },
  addItem: (item) => {
    console.log("Item añadido al carrito", item);
    // Aquí puedes agregar la lógica para añadir el ítem al carrito
    // Por ejemplo:
    // set((state) => ({ carrito: [...state.carrito, item] }));
  },
});

export const useCounterStore = create<CounterState>()(devtools(storeApi));
