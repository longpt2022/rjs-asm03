import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { cartActions } from 'store/cart';

const CartList = () => {
  // Lấy state redux
  const listCart = useSelector(state => state.cart.listCart);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const dispatch = useDispatch();

  // Biến xác định có cart nào k
  const hasCart = listCart.length > 0;

  // Hàm cộng tổng tất cả quantity có trong listCart
  const numberOfCartItems = listCart.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

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
    dispatch(cartActions.DELETE_CART(id));
  };

  return (
    <section className="pb-5">
      <div className="d-flex justify-content-between bg-light p-5 mb-4">
        <h4 className="p-4">CART</h4>
        <span className="p-4 text-secondary">CART</span>
      </div>
      <div className="row">
        <div className="col-lg-9">
          {listCart.map(cart => {
            return (
              <div key={cart._id.$oid} className="no-copy-text row">
                <span className="col-lg-2">{cart.name}</span>
                <div className="col-lg-2">
                  <p>{cart.price}</p>
                  <span>VND</span>
                </div>
                <div className="col-lg-2">
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    onClick={clickLeftHandler.bind(null, cart)}
                    className="p-2"
                  />

                  <b>{cart.quantity}</b>
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    onClick={clickRightHandler.bind(null, cart)}
                    className="p-2 me-2"
                  />
                </div>
                <div className="col-lg-2">
                  <p>{cart.price * cart.quantity}</p>
                  <span>VND</span>
                </div>
                <div className="col-lg-2">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={clickRemoveHandler.bind(null, cart._id.$oid)}
                    className="p-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-3">
          <p>Total products: {numberOfCartItems}</p>
          <p>{totalQuantity}</p>
          {hasCart && <button>Order</button>}
        </div>
      </div>
    </section>
  );
};

export default CartList;
