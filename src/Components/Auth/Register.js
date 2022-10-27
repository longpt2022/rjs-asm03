import { useNavigate } from 'react-router-dom';

import classes from './Login.module.css';

const Register = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  return (
    <section className={classes.auth}>
      <form className={classes.form}>
        <h3>Sign Up</h3>

        <div className={classes.control}>
          <input type="text" id="fullName" placeholder="Full Name" required />
          <input type="email" id="email" placeholder="Email" required />
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
          <input type="number" id="phone" placeholder="Phone" required />
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
