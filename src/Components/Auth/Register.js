import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import react-toastify để tạo thông báo
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import classes from './Login.module.css';

// Hàm kiểm tra input có dữ liệu không
const isRequired = value => (value.trim() ? true : false);

const Register = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  // dùng useRef() để lấy value input
  const fullNameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const phoneInputRef = useRef();

  // Lấy data từ localStorage
  const dataGetStorage = localStorage.getItem('userArr');
  // Xử lý null localStorage
  let userArr = dataGetStorage ? JSON.parse(dataGetStorage) : [];

  // State lưu message nếu validate lỗi
  const [message, setMessage] = useState('');

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
    if (!isRequired(enteredData.fullName)) {
      setMessage('Vui lòng nhập Full Name!');
    } else if (!isRequired(enteredData.email)) {
      setMessage('Vui lòng nhập Email!');
    } else if (sameEmail) {
      setMessage('Email đã đăng ký!');
    } else if (!isRequired(enteredData.password)) {
      setMessage('Vui lòng nhập Password!');
    } else if (enteredData.password.length < 8) {
      setMessage('Password nên nhiều hơn 8 ký tự!');
    } else if (!isRequired(enteredData.phone)) {
      setMessage('Vui lòng nhập Phone number!');
    } else {
      setMessage('');
      // Thêm 1 User vào 'userArr'
      userArr.push(enteredData);

      // toast thông báo Login thành công
      toast.success('Register success!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      setTimeout(() => {
        // lưu lại dữ liệu vào LocalStorage
        localStorage.setItem('userArr', JSON.stringify(userArr));
        // Chuyển trang
        navigate('/login');
      }, 1000);
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
            onChange={() => setMessage('')}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            ref={emailInputRef}
            onChange={() => setMessage('')}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            ref={passwordInputRef}
            onChange={() => setMessage('')}
          />
          <input
            type="number"
            id="phone"
            placeholder="Phone"
            required
            ref={phoneInputRef}
            onChange={() => setMessage('')}
          />
        </div>

        <div className={classes.actions}>
          {!message && <button>SIGN UP</button>}
          {message && <button className="text-danger">{message}</button>}
        </div>

        <div className={classes.toggle}>
          <span>Login?</span>
          <button type="button" onClick={() => navigate('/login')}>
            Click
          </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Register;
