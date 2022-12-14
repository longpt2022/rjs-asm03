import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cartActions } from 'store/cart';
import { toastActions } from 'store/toast';
import classes from './DetailProductForm.module.css';

const DetailProductForm = props => {
  const navigate = useNavigate();

  // Dùng useDispatch() cập nhật state redux
  const dispatch = useDispatch();

  // Lấy dữ liệu login state redux
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const quantityInputRef = useRef();

  // Giá trị của input quantity
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const submitHandler = event => {
    event.preventDefault();

    // Nếu chưa đăng nhập: chuyển trang và return
    if (!isAuthenticated) {
      navigate('/login');
      // Nếu k return đoạn code ở dưới vẫn chạy bt
      return;
    }

    // lấy ra giá trị Quantity input
    const enteredQuantity = quantityInputRef.current.value;
    // lưu lại dạng số
    const enteredQuantityNumber = +enteredQuantity;

    // Xử lý nhấp sai giá trị
    if (
      enteredQuantity.trim().length === 0 ||
      // Giới hạn từ (1-5)
      enteredQuantityNumber < 1 ||
      enteredQuantityNumber > 5
    ) {
      setQuantityIsValid(false);
      return;
    } else {
      setQuantityIsValid(true);
    }

    // console.log(props.productData.id);
    // console.log(enteredQuantityNumber);

    // Lưu lại vào state redux cart
    dispatch(
      cartActions.ADD_CART({
        // data product truyền từ cha
        ...props.productData,
        // số lượng product nhập vào input
        quantity: enteredQuantityNumber,
      })
    );

    // Thông báo add thành công
    dispatch(toastActions.SHOW_SUCCESS('Add success!'));
  };

  // Xử lý ấn giảm
  const clickLeftHandler = () => {
    document.getElementById(`quantity_${props.id}`).stepDown();
  };

  // Xử lý ấn tăng
  const clickRightHandler = () => {
    document.getElementById(`quantity_${props.id}`).stepUp();
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.inputForm}>
          <label htmlFor={`quantity_${props.id}`}>QUANTITY</label>

          <FontAwesomeIcon
            icon={faCaretLeft}
            onClick={clickLeftHandler}
            className="p-2"
          />
          <input
            ref={quantityInputRef}
            id={`quantity_${props.id}`}
            type="number"
            // min="1"
            // max="5"
            step="1"
            defaultValue="1"
          />
          <FontAwesomeIcon
            icon={faCaretRight}
            onClick={clickRightHandler}
            className="p-2 me-2"
          />
        </div>

        <button className="no-copy-text">Add to cart</button>
      </form>

      {quantityIsValid && <p className="mt-1 text-white no-copy-text">.</p>}
      {!quantityIsValid && (
        <p className="mt-1 text-warning no-copy-text">
          Please enter a valid quantity (1-5).
        </p>
      )}
    </>
  );
};

export default DetailProductForm;
