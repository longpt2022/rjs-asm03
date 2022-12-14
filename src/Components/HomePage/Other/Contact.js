import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { toastActions } from 'store/toast';
import classes from './Contact.module.css';

const Contact = () => {
  const dispatch = useDispatch();

  const emailInputRef = useRef();

  // Hàm submit contact form
  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    enteredEmail && console.log(enteredEmail);
    enteredEmail && dispatch(toastActions.SHOW_SUCCESS('Subscribe success!'));
  };

  return (
    <div className={`${classes.contact} row py-5`}>
      <div className="col-lg-6 col-12 mb-4 mb-lg-0 px-0">
        <h4>LET'S BE FRIENDS!</h4>
        <span className="text-secondary">
          Subscribe to receive update products.
        </span>
      </div>

      <div className="col-lg-6 col-12 col-sm-12 align-self-center px-0">
        <form onSubmit={submitHandler} className={classes.form}>
          <input
            type="email"
            placeholder="Enter your email address"
            required
            ref={emailInputRef}
          />
          <button>Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
