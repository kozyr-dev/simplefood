import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartState } from "./types";

const initialData: CartState = {
  items: [],
  totalAmount: 0,
};

export const useCartStore = create(
  persist<Cart>(
    (set) => ({
      totalAmount: 0,
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((cartItem) => cartItem.id === item.id);
          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              amount: updatedItems[existingItemIndex].amount + item.amount,
            };
            return {
              items: updatedItems,
              totalAmount: state.totalAmount + item.price * item.amount,
            };
          } else {
            return {
              items: [...state.items, item],
              totalAmount: state.totalAmount + item.price * item.amount,
            };
          }
        }),
      removeItem: (id) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((cartItem) => cartItem.id === id);
          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            const item = updatedItems[existingItemIndex];
            if (item.amount > 1) {
              updatedItems[existingItemIndex] = { ...item, amount: item.amount - 1 };
              return {
                items: updatedItems,
                totalAmount: state.totalAmount - item.price,
              };
            } else {
              updatedItems.splice(existingItemIndex, 1);
              return {
                items: updatedItems,
                totalAmount: state.totalAmount - item.price,
              };
            }
          }
          return state;
        }),
      deleteItem: (id) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex((cartItem) => cartItem.id === id);
          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            const item = updatedItems[existingItemIndex];
            updatedItems.splice(existingItemIndex, 1);
            return {
              items: updatedItems,
              totalAmount: state.totalAmount - item.price * item.amount,
            };
          }
          return state;
        }),
      reset: () => set(initialData),
    }),
    {
      name: "cart-storage",
    },
  ),
);
