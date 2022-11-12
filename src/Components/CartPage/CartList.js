import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeftLong,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import CartItem from './CartItem';
import CartTotal from './CartTotal';
import { checkoutActions } from 'store/checkout';
import { toastActions } from 'store/toast';
import classes from './CartList.module.css';

// Hàm chuyển đổi thành dạng chuỗi và bổ sung các dấu chấm ngăn cách giữa các đơn vị
const transformPrice = txt => {
  return String(txt).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const CartList = () => {
  const dispatch = useDispatch();

  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  // Lấy state redux
  const listCart = useSelector(state => state.cart.listCart);

  // Biến xác định có cart nào k
  const hasCart = listCart.length > 0;

  const btnCheckoutHandler = () => {
    // ngăn hiển thị checkout page nếu chưa có cart nào
    if (listCart.length === 0) {
      dispatch(toastActions.SHOW_INFO('Continue shopping...'));
    } else {
      // cho phép hiển thị checkout page chỉ khi bấm nút checkout
      dispatch(checkoutActions.SHOW_checkout());

      // Chuyển hướng sang checkout page
      navigate('/checkout');
    }
  };

  return (
    <section className="pb-5">
      <div className="d-flex justify-content-between bg-light p-5 mb-4">
        <h4 className="p-4">CART</h4>
        <span className="p-4 text-secondary">CART</span>
      </div>
      <h4 className={classes.titleCart}>SHOPPING CART</h4>

      <div className="row gx-0">
        <div className="col-lg-8 text-center pe-lg-4">
          <ul className="p-0">
            <li className="row gx-0 bg-light pt-3 pb-2">
              <h6 className="col-md-2 col-4">IMAGE</h6>
              <h6 className="col-md-2 col-4">PRODUCT</h6>
              <h6 className="col-md-2 col-4">PRICE</h6>
              <h6 className="col-md-2 col-4">QUANTITY</h6>
              <h6 className="col-md-2 col-4">TOTAL</h6>
              <h6 className="col-md-2 col-4">REMOVE</h6>
            </li>
            {hasCart &&
              listCart.map(cart => {
                return (
                  <CartItem
                    key={cart._id.$oid}
                    cart={cart}
                    transformPrice={transformPrice}
                  />
                );
              })}
            {!hasCart && (
              <p className="centered text-secondary">
                Chưa có sản phẩm nào trong giỏ hàng
              </p>
            )}
          </ul>
          <div className="d-flex justify-content-between bg-light mt-5 p-4">
            <button
              onClick={() => navigate('/shop')}
              className={`${classes.shoppingBtn} active-animation`}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} className="me-2" />
              Continue shopping
            </button>
            <button
              onClick={btnCheckoutHandler}
              className={`${classes.checkoutBtn} active-animation`}
            >
              Proceed to checkout
              <FontAwesomeIcon icon={faArrowRightLong} className="ms-2" />
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <CartTotal listCart={listCart} transformPrice={transformPrice} />
        </div>
      </div>
    </section>
  );
};

export default React.memo(CartList);
