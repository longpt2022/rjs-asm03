import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toastActions } from 'store/toast';
import classes from './Login.module.css';

const Register = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  // Dùng useDispatch() redux
  const dispatch = useDispatch();

  // dùng useRef() để lấy value input
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

  // Lấy data từ localStorage
  const dataGetStorage = localStorage.getItem('userArr');
  // Xử lý null localStorage
  let userArr = dataGetStorage ? JSON.parse(dataGetStorage) : [];

  // Xử lý ấn submit form
  const submitHandler = event => {
    event.preventDefault();

    // optional: Add validation
    const enteredData = {
      fullName: fullNameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      phone: phoneInputRef.current.value,
      address: '',
      orders: [],
    };

    // --- có thuộc tính "required" trong input rồi
    // Validate này k cần thiết nữa
    // if (enteredData.fullName.trim() === '') {
    //  alert('Enter Full Name!'));
    // } else if (enteredData.email.trim() === '') {
    //  alert('Enter Email!'));
    // } else if (enteredData.password.trim() === '') {
    //  alert('Enter Password!'));
    // } else if (enteredData.phone.trim() === '') {
    //  alert('Enter Phone number!'));
    // }

    // Kiểm tra trùng Username
    // console.log(userArr);
    let sameEmail;
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].email === enteredData.email) {
        sameEmail = true;
        break;
      }
    }

    // Validate dữ liệu hợp lệ
    if (sameEmail) {
      dispatch(toastActions.SHOW_WARN('Email đã đăng ký!'));
    } else if (enteredData.password.length < 8) {
      dispatch(toastActions.SHOW_WARN('Password nên nhiều hơn 8 ký tự!'));
    } else {
      // Thêm 1 User vào 'userArr'
      userArr.push(enteredData);

      // toast thông báo Login thành công
      dispatch(toastActions.SHOW_SUCCESS('Register success!'));

      // lưu lại dữ liệu vào LocalStorage
      localStorage.setItem('userArr', JSON.stringify(userArr));
      // Chuyển trang
      navigate('/login');
    }
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Sign Up</h3>

        <div className={classes.control}>
          <input
            type="text"
            id="fullName"
            placeholder="Full Name"
            required
            ref={fullNameInputRef}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            ref={emailInputRef}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
          />
          <input
            type="number"
            id="phone"
            placeholder="Phone"
            required
            ref={phoneInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>SIGN UP</button>
        </div>

        <div className={classes.toggle}>
          <span>Login?</span>
          <button type="button" onClick={() => navigate('/login')}>
            Click
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
