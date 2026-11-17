import type { Media } from "@/shared/api";

export interface CartState {
  items: Array<CartItem>;
  /** In kopiykas: an estimate for display; the order's subtotal comes from the API. */
  totalAmount: number;
}

export interface Cart extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: cartItemID) => void;
  deleteItem: (id: cartItemID) => void;
  reset: () => void;
}

export type CartItem = {
  /** The product's id (UUID). */
  id: string;
  title: string;
  image: Media | null;
  /** Unit price in kopiykas, as shown when it was added. */
  price: number;
  amount: number;
};

export type cartItemID = string;
