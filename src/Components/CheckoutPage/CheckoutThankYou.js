import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'Components/UI/Button/Button';
import classes from './CheckoutThankYou.module.css';
import { checkoutActions } from 'store/checkout';

const CheckoutThankYou = () => {
  const dispatch = useDispatch();

  // điều hướng trang
  const navigate = useNavigate();

  // ẩn hiển thị checkout page (thankyou page) sau 30s
  setTimeout(() => {
    dispatch(checkoutActions.HIDE_checkout());
    // console.log('Hide checkout done!');
  }, 10000);

  useEffect(() => {
    // tự động scroll về đầu trang
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <section className="login-main-wrapper">
      <div className="main-container">
        <div className="login-process">
          <div className="login-main-container">
            <div className={classes['thankyou-wrapper']}>
              <h1>
                <img
                  src="http://montco.happeningmag.com/wp-content/uploads/2014/11/thankyou.png"
                  alt="thanks"
                />
              </h1>
              <p>for contacting us, we will get in touch with you soon... </p>
              <div className="centered mt-4">
                <Button
                  className="me-4"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Back to home
                </Button>
                <Button
                  onClick={() => {
                    navigate('/shop');
                  }}
                >
                  Shopping more
                </Button>
              </div>
              <div className="clr"></div>
            </div>
            <div className="clr"></div>
          </div>
        </div>
        <div className="clr"></div>
      </div>
    </section>
  );
};

export default CheckoutThankYou;
