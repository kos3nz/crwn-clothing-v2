import { createContext, useContext, useMemo, useState } from 'react';

const useProviderValue = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleDropdown = () => {
    setIsCartOpen((isOpen) => !isOpen);
  };

  const value = useMemo(() => ({ isCartOpen, toggleDropdown }), [isCartOpen]);

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

// Types
type CartContextType = ReturnType<typeof useProviderValue>;
