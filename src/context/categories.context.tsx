import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCategoriesAndDocuments } from 'utils/firebase/firebase.utils';

const useProviderValue = () => {
  const [categoriesMap, setCategoriesMap] = useState<CategoryMap>({});

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesAndDocuments();

      const categoriesMap = categories.reduce((acc, category) => {
        acc[category.title.toLowerCase()] = category.items;

        return acc;
      }, {});

      setCategoriesMap(categoriesMap);
    };

    getCategories();
  }, []);

  const value = useMemo(
    () => ({ categoriesMap, setCategoriesMap }),
    [categoriesMap]
  );

  return value;
};

export const CategoriesContext = createContext<
  CategoriesContextType | undefined
>(undefined);

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useProviderValue();

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);

  if (context === undefined) {
    throw new Error('useCategoriesContext must be within CategoriesProvider');
  }

  return context;
};

// Types
type CategoriesContextType = ReturnType<typeof useProviderValue>;

export type Product = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CategoryMap = {
  [title: string]: Product[];
};
