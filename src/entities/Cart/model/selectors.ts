import { useCartStore } from "./store";

export const useCart = () => useCartStore((state) => state);

export const useAddItemToCart = () => useCartStore((state) => state.addItem);

export const useRemoveItemFromCart = () => useCartStore((state) => state.removeItem);

export const useDeleteItemFromCart = () => useCartStore((state) => state.deleteItem);

export const useResetCart = () => useCartStore((state) => state.reset);
