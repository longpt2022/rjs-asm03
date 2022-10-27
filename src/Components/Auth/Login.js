import { useNavigate } from 'react-router-dom';

import classes from './Login.module.css';

const Login = () => {
  // Dùng useNavigate() để điều hướng trang
  const navigate = useNavigate();

  return (
    <section className={classes.auth}>
      <form className={classes.form}>
        <h3>Sign In</h3>

        <div className={classes.control}>
          <input type="email" id="email" placeholder="Email" required />

          <input
            type="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className={classes.actions}>
          <button>SIGN UP</button>
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
