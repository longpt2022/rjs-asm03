import { useSelector } from 'react-redux';
import { useState } from 'react';

import CheckoutForm from './CheckoutForm';
import CheckoutOrder from './CheckoutOrder';
import CheckoutThankYou from './CheckoutThankYou';
import classes from './Checkout.module.css';

// Hàm chuyển đổi thành dạng chuỗi và bổ sung các dấu chấm ngăn cách giữa các đơn vị
const transformPrice = txt => {
  return String(txt).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Checkout = () => {
  const isShowCheckout = useSelector(state => state.checkout.isShow);
  // console.log(isShowCheckout);

  // Lấy totalQuantity state redux
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  // Lấy state redux
  const listCart = useSelector(state => state.cart.listCart);

  const [hasCart, setHasCart] = useState(listCart.length > 0);

  return (
    <>
      {isShowCheckout && (
        <>
          {hasCart && (
            <section className="pb-5">
              <div className="row justify-content-between bg-light p-5 mb-4">
                <h4 className="col-sm-6 p-4">CHECKOUT</h4>
                <span className="col-sm-6 text-end p-4">
                  HOME / CART / <span className="text-secondary">CHECKOUT</span>
                </span>
              </div>
              <h4 className={classes.titleCheckout}>BILLING DETAILS</h4>

              <div className="row gx-0">
                <div className="col-lg-8 order-2 order-lg-1 pe-lg-4">
                  <CheckoutForm
                    listCart={listCart}
                    totalQuantity={totalQuantity}
                    transformPrice={transformPrice}
                    setHasCart={setHasCart}
                  />
                </div>

                <div className="col-lg-4 order-1 order-lg-2 pb-4 pb-lg-0">
                  <CheckoutOrder
                    listCart={listCart}
                    totalQuantity={totalQuantity}
                    transformPrice={transformPrice}
                  />
                </div>
              </div>
            </section>
          )}
          {!hasCart && <CheckoutThankYou />}
        </>
      )}
      {!isShowCheckout && (
        <p className="centered pt-5">
          You should check your cart and then checkout!
        </p>
      )}
    </>
  );
};

export default Checkout;
