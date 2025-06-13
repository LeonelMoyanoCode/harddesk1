import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { ICartItem } from "../components/shared/CartItem";

export interface CartState {
  items: ICartItem[];
  totalItemInCart: number;
  totalAmount: number;

  addItem: (item: ICartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  cleanCart: () => void;
}

const storeApi: StateCreator<CartState> = (set) => ({
  items: [],
  totalItemInCart: 0,
  totalAmount: 0,

  addItem: (item) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.variantId === item.variantId
      );

      let updatedItems: ICartItem[];

      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        updatedItems = [...state.items, item];
      }

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalItemInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  },

  removeItem: (variantId) => {
    set((state) => {
      const updatedItems = state.items.filter((i) => i.variantId !== variantId);

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalItemInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  },

  updateQuantity: (variantId, quantity) => {
    set((state) => {
      const updatedItems = state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      );

      const newTotalItems = updatedItems.reduce(
        (acc, i) => acc + i.quantity,
        0
      );
      const newTotalAmount = updatedItems.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
      );

      return {
        items: updatedItems,
        totalItemInCart: newTotalItems,
        totalAmount: newTotalAmount,
      };
    });
  },

  cleanCart: () => {
    set({ items: [], totalItemInCart: 0, totalAmount: 0 });
  },
});

export const useCartStore = create<CartState>()(devtools(storeApi));
