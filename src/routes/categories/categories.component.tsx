import CategoryPreview from 'components/category-preview/category-preview.component';
import { selectCategoriesMap } from 'store/categories/categories.selectors';
import { useAppSelector } from 'store/hooks';

const Categories = ({}: CategoriesProps) => {
  const categoriesMap = useAppSelector(selectCategoriesMap);

  return (
    <div className="categories-container">
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          products={categoriesMap[title]}
        />
      ))}
    </div>
  );
};

export default Categories;

// Types
export type CategoriesProps = {};
