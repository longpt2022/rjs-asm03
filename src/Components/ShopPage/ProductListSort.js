import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

import classes from './ProductListSort.module.css';

// Hàm sắp xếp danh sách
const sortProducts = (products, ascending) => {
  return products.sort((productA, productB) => {
    if (ascending) {
      return productA.price - productB.price;
    } else {
      return productB.price - productA.price;
    }
  });
};

const ProductListSort = props => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get('sort') === 'asc';

  const sortedProducts = sortProducts(props.products, isSortingAscending);

  // Xử lý click sort
  const changeDefaultHandler = () => {
    navigate('/shop');
    props.onSortProduct(sortedProducts);
  };

  const changeAscendingHandler = () => {
    navigate('/shop?sort=desc');
    props.onSortProduct(sortedProducts);
  };

  const changeDescendingHandler = () => {
    navigate('/shop?sort=asc');
    props.onSortProduct(sortedProducts);
  };

  return (
    <div className={classes.dropdown}>
      <button onClick={changeDefaultHandler} className={classes.defaultBtn}>
        Default sorting
        {isSortingAscending ? (
          <FontAwesomeIcon icon={faAngleDown} className="ms-4" />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} className="ms-4" />
        )}
      </button>
      <ul className={`${classes['dropdown-content']} list-group`}>
        <li className="list-group-item list-group-item-action">
          <button onClick={changeAscendingHandler}>Ascending</button>
        </li>
        <li className="list-group-item list-group-item-action">
          <button onClick={changeDescendingHandler}>Descending</button>
        </li>
      </ul>
    </div>
  );
};

export default ProductListSort;
