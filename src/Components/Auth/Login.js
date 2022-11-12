import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authActions } from 'store/auth';
import { toastActions } from 'store/toast';
import classes from './Login.module.css';

const Login = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  // lấy value input
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // Lấy data từ localStorage
  const dataGetStorage = localStorage.getItem('userArr');
  // Xử lý null localStorage
  let userArr = dataGetStorage ? JSON.parse(dataGetStorage) : [];

  // State lưu message nếu validate lỗi
  const [message, setMessage] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    // console.log(userArr);

    const enteredData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    //--- optional: validation
    let userValidated = false;
    // Tìm thông tin current user
    let currentUser = userArr.find(acc => acc.email === enteredData.email);
    // console.log(currentUser);

    if (enteredData.email === '') return;
    if (enteredData.password === '') return;

    if (!currentUser) {
      // toast thông báo (lấy từ store redux)
      dispatch(toastActions.SHOW_SUCCESS('Tài khoản chưa đăng ký!'));

      setEnteredPassword('');
      // Kiểm tra Password
    } else {
      if (currentUser?.password === enteredData.password) {
        userValidated = true;
      } else {
        setEnteredPassword('');

        // toast thông báo (lấy từ store redux)
        dispatch(toastActions.SHOW_WARN('Wrong password!'));
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
    if (event.target.value.trim().length > 0) {
      setMessage('');
    }
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setMessage('');
    }
    setEnteredPassword(event.target.value);
  };

  return (
    <section className={classes.auth}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h3>Sign In</h3>

        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            value={enteredEmail}
            onChange={emailChangeHandler}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>

        <div className={classes.actions}>
          {!message && <button>SIGN IN</button>}
          {message && <button className="text-danger">{message}</button>}
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
