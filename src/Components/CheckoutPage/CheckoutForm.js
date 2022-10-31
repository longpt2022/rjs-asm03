import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from 'store/cart';

import classes from './CheckoutForm.module.css';

const CheckoutForm = props => {
  // Dùng useNavigate() để điều hướng trang
  const dispatch = useDispatch();

  // dùng useRef() để lấy value input
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();
  const addressInputRef = useRef();

  // Lấy data userArr từ localStorage
  const getUserArrStorage = localStorage.getItem('userArr');
  // Xử lý null localStorage
  let userArr = getUserArrStorage ? JSON.parse(getUserArrStorage) : [];

  // Lấy data currentUser từ localStorage
  const getCurrentUserStorage = localStorage.getItem('currentUser');
  // Xử lý null localStorage
  let currentUser = getCurrentUserStorage
    ? JSON.parse(getCurrentUserStorage)
    : [];

  // States lưu entered input
  const [enteredFullName, setEnteredFullName] = useState(currentUser.fullName);
  const [enteredEmail, setEnteredEmail] = useState(currentUser.email);
  const [enteredPhone, setEnteredPhone] = useState(currentUser.phone);
  const [enteredAddress, setEnteredAddress] = useState('');

  const fullNameChangeHandler = event => {
    setEnteredFullName(event.target.value);
  };

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const phoneChangeHandler = event => {
    setEnteredPhone(event.target.value);
  };

  const addressChangeHandler = event => {
    setEnteredAddress(event.target.value);
  };

  // Xử lý ấn submit form
  const submitHandler = event => {
    event.preventDefault();

    // optional: Add validation
    const enteredData = {
      fullName: fullNameInputRef.current.value,
      email: emailInputRef.current.value,
      phone: phoneInputRef.current.value,
      address: addressInputRef.current.value,
    };

    // Validate dữ liệu hợp lệ
    if (window.confirm('Xác nhận đặt hàng!')) {
      // Tìm index của user đặt hàng
      const userOrderIndex = userArr.findIndex(
        user => user.email === enteredData.email
      );
      // console.log(userOrderIndex);

      // Lọc ra mảng mới lưu số đơn hàng từ giỏ hàng hiện tại
      let orderedList = [];
      for (let i = 0; i < props.listCart.length; i++) {
        orderedList.push({
          name: props.listCart[i].name,
          price: props.transformPrice(props.listCart[i].price),
          quantity: props.listCart[i].quantity,
        });
      }
      // console.log(orderedList);

      // thêm data cart vào userArr[i]orders
      userArr[userOrderIndex].orders = [
        ...userArr[userOrderIndex].orders,
        {
          products: orderedList,
          date: new Date(),
          deliveryInfo: enteredData,
          total: props.transformPrice(props.totalQuantity),
        },
      ];
      // console.log(userArr[userOrderIndex]);
      // console.log(userArr);

      // update lại state cart = 0
      dispatch(cartActions.SET_DEFAULT());

      // lưu lại dữ liệu userArr vào LocalStorage
      localStorage.setItem('userArr', JSON.stringify(userArr));

      // xóa cart khỏi LocalStorage
      localStorage.removeItem('cart');

      // set lại state cart checkout page để load thankyou page
      props.setHasCart(false);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="fullName">FULL NAME:</label>
        <input
          type="text"
          id="fullName"
          placeholder="Enter Your Full Name Here!"
          required
          ref={fullNameInputRef}
          value={enteredFullName}
          onChange={fullNameChangeHandler}
        />
        <label htmlFor="email">EMAIL:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter Your Email Here!"
          required
          ref={emailInputRef}
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <label htmlFor="phone">PHONE NUMBER:</label>
        <input
          type="number"
          id="phone"
          placeholder="Enter Your Phone Here!"
          required
          ref={phoneInputRef}
          value={enteredPhone}
          onChange={phoneChangeHandler}
        />
        <label htmlFor="address">ADDRESS:</label>
        <input
          type="text"
          id="address"
          placeholder="Enter Your Address Here!"
          required
          ref={addressInputRef}
          value={enteredAddress}
          onChange={addressChangeHandler}
        />
      </div>

      <div className={classes.actions}>
        <button>Place order</button>
      </div>
    </form>
  );
};

export default CheckoutForm;
