import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeftLong,
  faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// import react-toastify để tạo thông báo
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CartItem from './CartItem';
import CartTotal from './CartTotal';
import classes from './CartList.module.css';
import { checkoutActions } from 'store/checkout';

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
      toast.info('Continue shopping...', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } else {
      // cho phép hiển thị checkout page chỉ khi bấm nút checkout
      dispatch(checkoutActions.SHOW_checkout());

      // Chuyển hướng sang checkout page
      navigate('/checkout');
    }
  };

  return (
    <section className="pb-5">
      <ToastContainer />
      <div className="d-flex justify-content-between bg-light p-5 mb-4">
        <h4 className="p-4">CART</h4>
        <span className="p-4 text-secondary">CART</span>
      </div>
      <h4 className={classes.titleCart}>SHOPPING CART</h4>

      <div className="row gx-0">
        <div className="col-lg-8 text-center pe-lg-4">
          <ul className="p-0">
            <li className="row gx-0 bg-light pt-3 pb-2">
              <h6 className="col-2">IMAGE</h6>
              <h6 className="col-2">PRODUCT</h6>
              <h6 className="col-2">PRICE</h6>
              <h6 className="col-2">QUANTITY</h6>
              <h6 className="col-2">TOTAL</h6>
              <h6 className="col-2">REMOVE</h6>
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

export default CartList;
