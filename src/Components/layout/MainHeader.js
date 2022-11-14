import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartFlatbed,
  faUser,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

import { authActions } from 'store/auth';
import { toastActions } from 'store/toast';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  const [isShowMenuMobile, setIsShowMenuMobile] = useState(false);

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
        onClick={() => {
          navigate(path);
          setIsShowMenuMobile(false);
        }}
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

  // show menu ở mobile
  const toggleMenu = () => {
    setIsShowMenuMobile(prevState => !prevState);
  };

  const navigateAndCloseMenu = path => {
    if (isShowMenuMobile) {
      navigate(path);
      setIsShowMenuMobile(false);
    } else {
      navigate(path);
    }
  };

  const showMM = isShowMenuMobile ? `show ${classes.mobileNavItems}` : '';

  return (
    <header className={classes.header}>
      <nav className="navbar navbar-expand-md navbar-light bg-faded">
        <div className={`container ${classes.positionMM}`}>
          <Link className={`${classes.abs} navbar-brand`} to="/">
            BOUTIQUE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`navbar-collapse collapse w-100 ${showMM}`}
            id="collapsingNavbar"
          >
            <ul className="navbar-nav w-100 justify-content-md-start">
              <li className="nav-item">{buttonNav('home')}</li>
              <li className="nav-item">{buttonNav('shop')}</li>
            </ul>
            <ul className="nav navbar-nav ms-auto w-100 justify-content-md-end">
              {isAuthenticated && (
                <>
                  <li className={`nav-item ${btnClasses}`}>
                    <FontAwesomeIcon
                      icon={faCartFlatbed}
                      className={classes.navIcon}
                      onClick={() => navigateAndCloseMenu('/cart')}
                    />
                    {buttonNav('cart')}
                  </li>
                  <li className="nav-item">
                    <FontAwesomeIcon
                      icon={faUser}
                      className={classes.navIcon}
                      onClick={() => navigateAndCloseMenu('/profile')}
                    />
                    <button
                      className={
                        location.pathname === '/profile' ? classes.active : ''
                      }
                      onClick={() => navigateAndCloseMenu('/profile')}
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
                  <li className="nav-item">
                    <button
                      onClick={() => {
                        dispatch(authActions.ON_LOGOUT());
                        dispatch(toastActions.SHOW_SUCCESS('Logout success!'));
                        navigateAndCloseMenu('/login');
                      }}
                    >
                      (Logout)
                    </button>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <li className="nav-item">
                  <FontAwesomeIcon
                    icon={faUser}
                    className={classes.navIcon}
                    onClick={() => navigateAndCloseMenu('/login')}
                  />
                  <button
                    className={
                      location.pathname === '/login' ||
                      location.pathname === '/register'
                        ? classes.active
                        : ''
                    }
                    onClick={() => navigateAndCloseMenu('/login')}
                  >
                    Login
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
