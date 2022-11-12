import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from 'Components/UI/Input/Input';
import { authActions } from 'store/auth';
import { toastActions } from 'store/toast';
import classes from './Login.module.css';

const Login = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  // lấy value input
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // Lấy data từ localStorage
  const dataGetStorage = localStorage.getItem('userArr');
  // Xử lý null localStorage
  let userArr = dataGetStorage ? JSON.parse(dataGetStorage) : [];

  const submitHandler = event => {
    event.preventDefault();
    // console.log(userArr);

    const enteredData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    // Xử lý nếu chưa nhập => focus vào input đó
    if (enteredData.email === '') {
      emailInputRef.current.focus();
      return;
    } else if (enteredData.password === '') {
      passwordInputRef.current.focus();
      return;
    }

    //--- optional: validation
    let userValidated = false;
    // Tìm thông tin current user
    let currentUser = userArr.find(acc => acc.email === enteredData.email);
    // console.log(currentUser);

    // nếu k có thông tin current user
    if (!currentUser) {
      // toast thông báo (lấy từ store redux)
      dispatch(toastActions.SHOW_WARN('Tài khoản chưa đăng ký!'));

      setEnteredPassword('');
      // Kiểm tra Password
    } else {
      if (currentUser?.password === enteredData.password) {
        userValidated = true;
      } else {
        setEnteredPassword('');

        // toast thông báo (lấy từ store redux)
        dispatch(toastActions.SHOW_WARN('Wrong password!'));
        passwordInputRef.current.focus();
      }
    }

    // Xử lý nếu đăng nhập thành công
    if (userValidated) {
      // alert('Đăng nhập thành công!');
      // console.log(currentUser);

      // toast thông báo Login thành công (lấy từ store redux)
      dispatch(toastActions.SHOW_SUCCESS('Login success!'));

      // cập nhật dữ liệu state Redux bằng action login
      dispatch(authActions.ON_LOGIN(currentUser));

      navigate('/');
    }
  };

  const emailChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    setEnteredPassword(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Sign In</h3>

        <div className={classes.control}>
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
        </div>

        <div className={classes.actions}>
          <button>SIGN IN</button>
        </div>

        <div className={classes.toggle}>
          <span>Create an account?</span>
          <button type="button" onClick={() => navigate('/register')}>
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
