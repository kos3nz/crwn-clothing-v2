import { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from './products.context';

const useProviderValue = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const toggleDropdown = () => {
    setIsCartOpen((isOpen) => !isOpen);
  };

  const addItemToCart = (product: Product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const cartCount = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const value = useMemo(
    () => ({ cartItems, isCartOpen, toggleDropdown, addItemToCart, cartCount }),
    [cartItems, isCartOpen]
  );

  return value;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

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

/* Types */
type CartContextType = ReturnType<typeof useProviderValue>;

export type CartItemType = {
  quantity: number;
} & Product;

/* Helper functions */
const addCartItem = (
  cartItems: CartItemType[],
  product: Product
): CartItemType[] => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};
