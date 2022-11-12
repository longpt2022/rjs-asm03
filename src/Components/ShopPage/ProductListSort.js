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
  const clickAscendingHandler = () => {
    // Nếu isSortingAscending === 'asc'
    !!isSortingAscending &&
      navigate({
        pathname: location.pathname,
        search: '?sort=desc',
      });
    !!isSortingAscending && props.onSortProduct(sortedProducts);
  };

  const clickDescendingHandler = () => {
    // Nếu isSortingAscending !== 'asc'
    !isSortingAscending &&
      navigate({
        pathname: location.pathname,
        search: '?sort=asc',
      });
    !isSortingAscending && props.onSortProduct(sortedProducts);
  };

  return (
    <div className={classes.dropdown}>
      <button className={classes.defaultBtn}>
        Default sorting
        {isSortingAscending ? (
          <FontAwesomeIcon icon={faAngleDown} className="ms-4" />
        ) : (
          <FontAwesomeIcon icon={faAngleUp} className="ms-4" />
        )}
      </button>
      <ul className={`${classes['dropdown-content']} list-group no-copy-text`}>
        <li
          className="list-group-item list-group-item-action"
          onClick={clickAscendingHandler}
        >
          <FontAwesomeIcon icon={faAngleUp} className="me-2" />
          Ascending
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={clickDescendingHandler}
        >
          <FontAwesomeIcon icon={faAngleDown} className="me-2" />
          Descending
        </li>
      </ul>
    </div>
  );
};

export default ProductListSort;
