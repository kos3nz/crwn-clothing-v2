import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from 'store/categories/categories.slice';

/* State */
export const INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
};

/* Slice */
const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      state.cartItems = addCartItem(state.cartItems, action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<Product>) => {
      state.cartItems = removeCartItem(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action: PayloadAction<Product>) => {
      state.cartItems = clearCartItem(state.cartItems, action.payload);
    },
    toggleCartDropdown: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  toggleCartDropdown,
} = cartSlice.actions;

export default cartSlice.reducer;

/* Helper functions */
const addCartItem = (
  cartItems: CartItemType[],
  product: Product
): CartItemType[] => {
  const existingCartItem = hasCartItem(cartItems, product);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItemType[], product: Product) => {
  const existingCartItem = hasCartItem(cartItems, product);

  if (existingCartItem && existingCartItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }

  return clearCartItem(cartItems, product);
};

const hasCartItem = (cartItems: CartItemType[], product: Product) => {
  return cartItems.find((item) => item.id === product.id);
};

const clearCartItem = (cartItems: CartItemType[], product: Product) => {
  return cartItems.filter((item) => item.id !== product.id);
};

/* Types */
export type CartItemType = {
  quantity: number;
} & Product;

type CartState = {
  cartItems: CartItemType[];
  isCartOpen: boolean;
};
