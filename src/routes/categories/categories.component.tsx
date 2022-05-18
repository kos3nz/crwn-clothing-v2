import CategoryPreview from 'components/category-preview/category-preview.component';
import Spinner from 'components/spinner/spinner.component';
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from 'store/categories/categories.selectors';
import { useAppSelector } from 'store/hooks';

const Categories = ({}: CategoriesProps) => {
  const categoriesMap = useAppSelector(selectCategoriesMap);
  const isLoading = useAppSelector(selectCategoriesIsLoading);

  return (
    <div className="categories-container">
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => (
          <CategoryPreview
            key={title}
            title={title}
            products={categoriesMap[title]}
          />
        ))
      )}
    </div>
  );
};

export default Categories;

// Types
export type CategoriesProps = {};
