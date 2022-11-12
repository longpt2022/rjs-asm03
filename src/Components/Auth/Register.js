import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from 'Components/UI/Input/Input';
import { toastActions } from 'store/toast';
import classes from './Login.module.css';

const Register = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  // Dùng useDispatch() redux
  const dispatch = useDispatch();

  // Lấy data từ localStorage
  const dataGetStorage = localStorage.getItem('userArr');
  // Xử lý null localStorage
  let userArr = dataGetStorage ? JSON.parse(dataGetStorage) : [];

  // lấy value input
  const [enteredFullName, setEnteredFullName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');

  // dùng useRef() để lấy value input
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

  // Xử lý ấn submit form
  const submitHandler = event => {
    event.preventDefault();

    // optional: Add validation
    const enteredData = {
      fullName: enteredFullName,
      email: enteredEmail,
      password: enteredPassword,
      phone: enteredPhone,
      address: '',
      orders: [],
    };

    // Validate dữ liệu
    if (enteredData.fullName === '') {
      fullNameInputRef.current.focus();
      return;
    } else if (enteredData.email === '') {
      emailInputRef.current.focus();
      return;
    } else if (enteredData.password === '') {
      passwordInputRef.current.focus();
      return;
    } else if (enteredData.phone === '') {
      phoneInputRef.current.focus();
      return;
    } else if (enteredData.password.length < 8) {
      dispatch(toastActions.SHOW_WARN('Password nên nhiều hơn 8 ký tự!'));
      passwordInputRef.current.focus();
      return;
    } else if (enteredData.phone.length < 10 || enteredData.phone.length > 11) {
      dispatch(toastActions.SHOW_WARN('Phone needs 10 or 11 numbers!'));
      phoneInputRef.current.focus();
      return;
    }

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
      return;
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

  // Value input change handlers
  const fullNameChangeHandler = event => {
    setEnteredFullName(event.target.value);
  };

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    setEnteredPassword(event.target.value);
  };

  const phoneChangeHandler = event => {
    setEnteredPhone(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Sign Up</h3>

        <div className={classes.control}>
          <Input
            ref={fullNameInputRef}
            type="text"
            id="fullName"
            placeholder="Full Name"
            value={enteredFullName}
            onChange={fullNameChangeHandler}
          />
          <Input
            ref={emailInputRef}
            type="email"
            id="email"
            placeholder="Email"
            value={enteredEmail}
            onChange={emailChangeHandler}
          />
          <Input
            ref={passwordInputRef}
            type="password"
            id="password"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
          <Input
            ref={phoneInputRef}
            type="number"
            id="phone"
            placeholder="Phone"
            value={enteredPhone}
            onChange={phoneChangeHandler}
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
