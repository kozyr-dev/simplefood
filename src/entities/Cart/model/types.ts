import { ImageProps } from "@/shared/types/types";

export interface CartState {
  items: Array<CartItem>;
  totalAmount: number;
}

export interface Cart extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: cartItemID) => void;
  deleteItem: (id: cartItemID) => void;
  reset: () => void;
}

export type CartItem = {
  id: number;
  title: string;
  image: ImageProps;
  price: number;
  amount: number;
};

export type cartItemID = number;
