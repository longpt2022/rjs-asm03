import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

import { toastActions } from 'store/toast';
import Button from 'Components/UI/Button/Button';
import classes from './CartTotal.module.css';

const CartTotal = props => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  // Hàm cộng tổng tất cả quantity có trong listCart
  const numberOfCartItems = props.listCart.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  return (
    <div className={`${classes.cartTotal} bg-light p-5`}>
      <h4 className="mb-3">CART TOTAL</h4>
      <div className="d-flex justify-content-between">
        <b>Total products:</b>
        <p className="text-secondary">
          {numberOfCartItems} {numberOfCartItems !== 1 ? 'products' : 'product'}
        </p>
      </div>
      <div className="d-flex justify-content-between">
        <b>SUBTOTAL</b>
        <p className="text-secondary">
          {props.transformPrice(totalQuantity)} VND
        </p>
      </div>
      <div
        className={`${classes.totalPrice} pt-3 d-flex justify-content-between`}
      >
        <b>TOTAL</b>
        <p className="fs-5">{props.transformPrice(totalQuantity)} VND</p>
      </div>
      <div className={classes.coupon}>
        <input type="text" placeholder="Enter your coupon" />
        <Button
          onClick={() => {
            dispatch(toastActions.SHOW_WARN('Tính năng này chưa khả dụng!'));
          }}
        >
          <FontAwesomeIcon icon={faGift} className="me-2" />
          Apply coupon
        </Button>
      </div>
    </div>
  );
};

export default CartTotal;
