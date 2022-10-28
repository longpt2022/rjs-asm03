import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { cartActions } from 'store/cart';
import classes from './CartItem.module.css';

const CartItem = props => {
  const dispatch = useDispatch();

  // Hàm xử lý giảm 1
  const clickLeftHandler = productData => {
    if (productData.quantity > 1) {
      dispatch(
        cartActions.UPDATE_CART({
          // data product truyền từ cha
          ...productData,
          // số lượng product nhập vào input
          quantity: -1,
        })
      );
    }
  };

  // Hàm xử lý tăng 1
  const clickRightHandler = productData => {
    dispatch(
      cartActions.UPDATE_CART({
        // data product truyền từ cha
        ...productData,
        // số lượng product nhập vào input
        quantity: 1,
      })
    );
  };

  // Xử lý remove cart
  const clickRemoveHandler = id => {
    // if (confirm('Are you sure?')) {

    // } else {
    //   console.log('You canceled delete!');
    // }

    dispatch(cartActions.DELETE_CART(id));
  };

  return (
    <li className={`${classes['cart-item']} no-copy-text row`}>
      <div className="col-2">
        <img src={props.cart.img1} alt={props.cart.name} className="w-100" />
      </div>
      <h6 className="col-2">{props.cart.name}</h6>
      <div className="col-2 text-secondary">
        <p className="mb-1">{props.transformPrice(props.cart.price)}</p>
        <span>VND</span>
      </div>
      <div className="col-2 d-flex justify-content-center align-items-center">
        <FontAwesomeIcon
          icon={faCaretLeft}
          onClick={clickLeftHandler.bind(null, props.cart)}
          className="p-2 active-animation"
        />

        <b>{props.cart.quantity}</b>
        <FontAwesomeIcon
          icon={faCaretRight}
          onClick={clickRightHandler.bind(null, props.cart)}
          className="p-2 active-animation"
        />
      </div>
      <div className="col-2 text-secondary">
        <p className="mb-1">
          {props.transformPrice(props.cart.price * props.cart.quantity)}
        </p>
        <span>VND</span>
      </div>
      <div className="col-2 text-secondary">
        <FontAwesomeIcon
          icon={faTrashCan}
          onClick={clickRemoveHandler.bind(null, props.cart._id.$oid)}
          className="p-2 active-animation"
        />
      </div>
    </li>
  );
};

export default CartItem;
