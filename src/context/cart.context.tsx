import { useReducer } from 'react';
import { createContext, useContext } from 'react';
import type { Product } from './categories.context';
import { createAction } from 'utils/reducer/reducer.utils';

const useProviderValue = () => {
  const [{ cartItems, isCartOpen, cartCount, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const toggleDropdown = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN));
  };

  const updateCartItemsReducer = (newCartItems: CartItemType[]) => {
    const newCartCount = newCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const newTotalPrice = newCartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalPrice: newTotalPrice,
      })
    );
  };

  const addItemToCart = (product: Product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (product: Product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (product: Product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  return {
    cartItems,
    isCartOpen,
    cartCount,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    toggleDropdown,
  };
};

/* State */
export const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  totalPrice: 0,
};

/* Action */
export const CART_ACTION_TYPES = {
  TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
} as const;

/* Context */
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

/* Reducer */
const cartReducer = (state: CartState, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN: {
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    }
    case CART_ACTION_TYPES.SET_CART_ITEMS: {
      return {
        ...state,
        ...payload,
      };
    }

    default: {
      throw new Error(`Unhandled type ${type} in cartReducer`);
    }
  }
};

/* Provider */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useProviderValue();

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCartContext must be within CartProvider');
  }

  return context;
};

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
type CartContextType = ReturnType<typeof useProviderValue>;

export type CartItemType = {
  quantity: number;
} & Product;

type CartState = {
  cartItems: CartItemType[];
  isCartOpen: boolean;
  cartCount: number;
  totalPrice: number;
};

type CartAction = {
  type: keyof typeof CART_ACTION_TYPES;
  payload?: SetCartItemsPayload;
};

type SetCartItemsPayload = {
  cartItems: CartItemType[];
  cartCount: number;
  totalPrice: number;
};
