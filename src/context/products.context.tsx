import { createContext, useContext, useMemo, useState } from 'react';

import PRODUCTS from 'data/shop-data.json';

const useProviderValue = () => {
  const [products, setProducts] = useState(PRODUCTS);

  const value = useMemo(() => ({ products, setProducts }), [products]);

  return value;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useProviderValue();

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error('useProductsContext must be within ProductsProvider');
  }

  return context;
};

// Types
type ProductsContextType = ReturnType<typeof useProviderValue>;

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};
