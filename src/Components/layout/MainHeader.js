import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartFlatbed,
  faUser,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { authActions } from 'store/auth';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  // Lấy currentUser state redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const currentUser = useSelector(state => state.auth.currentUser);
  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // Dùng useNavigate() hook để chuyển hướng trong ứng dụng.
  const navigate = useNavigate();

  // Lấy ra vị trí path hiện tại
  const location = useLocation();
  // console.log(location.pathname);

  // Tạo button nav
  const buttonNav = name => {
    // Tạo path
    const path = `/${name}`;

    // Tạo name viết hoa chữ cái đầu
    const nameBtn = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    return (
      <button
        className={location.pathname === path ? classes.active : ''}
        onClick={() => navigate(path)}
      >
        {nameBtn}
      </button>
    );
  };

  // Xử lý hiệu ứng "bump" khi ấn add cart từ detail page
  const listCart = useSelector(state => state.cart.listCart);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (listCart.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [listCart]);

  return (
    <header className={classes.header}>
      <nav className="navbar navbar-light navbar-expand-md bg-faded">
        <div className="container">
          <button
            className={`${classes.abs} navbar-brand`}
            onClick={() => navigate('/')}
          >
            BOUTIQUE
          </button>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse w-100" id="collapseNavbar">
            <ul className="navbar-nav w-100 justify-content-start">
              <li className="nav-item">{buttonNav('home')}</li>
              <li className="nav-item">{buttonNav('shop')}</li>
            </ul>
            <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
              <li className={`nav-item ${btnClasses}`}>
                <FontAwesomeIcon
                  icon={faCartFlatbed}
                  className={classes.navIcon}
                />
                {buttonNav('cart')}
              </li>
              {!isAuthenticated && (
                <li className="nav-item">
                  <FontAwesomeIcon icon={faUser} className={classes.navIcon} />
                  <button
                    className={
                      location.pathname === '/login' ||
                      location.pathname === '/register'
                        ? classes.active
                        : ''
                    }
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item">
                  <FontAwesomeIcon icon={faUser} className={classes.navIcon} />
                  <button
                    className={
                      location.pathname === '/profile' ? classes.active : ''
                    }
                    onClick={() => navigate('/profile')}
                  >
                    <>
                      {currentUser.fullName}
                      <FontAwesomeIcon
                        icon={faCaretDown}
                        className={`${classes.navIcon} text-dark ms-2 me-0`}
                      />
                    </>
                  </button>
                </li>
              )}
              {isAuthenticated && (
                <li className="nav-item align-self-center">
                  <button onClick={() => dispatch(authActions.ON_LOGOUT())}>
                    (Logout)
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
