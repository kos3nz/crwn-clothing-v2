import { useNavigate } from 'react-router-dom';
import { type DirectoryCategory } from 'components/directory/directory.component';

import './directory-item.styles.scss';

const DirectoryItem = ({
  category: { title, imageUrl, route },
}: DirectoryItemProps) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;

// Types
type DirectoryItemProps = {
  category: DirectoryCategory;
};
