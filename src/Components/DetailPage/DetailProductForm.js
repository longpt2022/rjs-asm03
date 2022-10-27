import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import classes from './DetailProductForm.module.css';

const DetailProductForm = props => {
  const quantityInputRef = useRef();

  // Giá trị của input quantity
  const [quantityIsValid, setQuantityIsValid] = useState(true);

  const submitHandler = event => {
    event.preventDefault();

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

    console.log(props.id);
    console.log(enteredQuantityNumber);

    // props.onAddToCart(enteredQuantityNumber);
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
        <label htmlFor={`quantity_${props.id}`}>QUANTITY</label>

        <FontAwesomeIcon
          icon={faCaretLeft}
          onClick={clickLeftHandler}
          className="p-3"
        />
        <input
          ref={quantityInputRef}
          id={`quantity_${props.id}`}
          type="number"
          min="1"
          max="5"
          step="1"
          defaultValue="1"
        />
        <FontAwesomeIcon
          icon={faCaretRight}
          onClick={clickRightHandler}
          className="p-3 me-2"
        />

        <button className="px-4 py-2 fs-6 fw-light">Add to cart</button>
      </form>

      {!quantityIsValid && (
        <p className="mt-1 text-warning">Please enter a valid amount (1-5).</p>
      )}
    </>
  );
};

export default DetailProductForm;
