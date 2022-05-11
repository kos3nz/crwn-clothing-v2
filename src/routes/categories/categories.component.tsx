import CategoryPreview from 'components/category-preview/category-preview.component';
import { useCategoriesContext } from 'context/categories.context';

const Categories = ({}: CategoriesProps) => {
  const { categoriesMap } = useCategoriesContext();

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
