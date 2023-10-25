import { create } from "zustand";
import { StoreProduct } from "@/server/schema/product";

// Define the interface of the Cart state
interface State {
  open: boolean;
  cart: StoreProduct[];
  totalItems: number;
  totalPrice: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  setOpen: (open: boolean) => void;
  addToCart: (Item: StoreProduct) => void;
  removeFromCart: (Item: StoreProduct) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  open: false,
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create<State & Actions>((set, get) => ({
  open: INITIAL_STATE.open,
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  setOpen: (open: boolean) => set({ open }),
  addToCart: (storeProduct: StoreProduct) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === storeProduct.id);

    // If the item already exists in the Cart, increase its quantity
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === storeProduct.id
          ? { ...item, quantity: (item.quantity as number) + 1 }
          : item,
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + storeProduct.price,
      }));
    } else {
      const updatedCart = [...cart, { ...storeProduct, quantity: 1 }];

      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + storeProduct.price,
      }));
    }
  },
  removeFromCart: (storeProduct: StoreProduct) => {
    const cart = get().cart;

    const cartItem = cart.find((item) => item.id === storeProduct.id);

    // If the item already exists in the Cart, decrease its quantity
    if ((cartItem?.quantity as number) > 1) {
      const updatedCart = cart.map((item) =>
        item.id === storeProduct.id
          ? { ...item, quantity: (item.quantity as number) - 1 }
          : item,
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems - 1,
        totalPrice: state.totalPrice - storeProduct.price,
      }));
      return;
    }

    // Remove item from Cart
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== storeProduct.id),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - storeProduct.price,
    }));
  },
}));
