import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import { popupActions } from 'store/popup';
import Button from 'Components/UI/Button/Button';
import Modal from 'Components/UI/Modal/Modal';
import classes from './Popup.module.css';

const Popup = props => {
  // Dùng useNavigate() để chuyến hướng trang
  const navigate = useNavigate();

  // Dùng redux state hiển thị popup
  const dispatch = useDispatch();
  const productData = useSelector(state => state.popup.data);
  // console.log(productData);

  //  Dùng redux ẩn popup
  const hidePopupHandler = () => {
    dispatch(popupActions.HIDE_POPUP());
  };

  // Nút xem chi tiết và ấn popup
  const viewDetailBtnHandler = () => {
    hidePopupHandler();
    navigate(`/detail/${productData._id.$oid}`);
  };

  return (
    <Modal onClose={hidePopupHandler}>
      <div className={`${classes.popup} row`}>
        <div className="col-lg-6 col-md-12">
          <img
            src={productData.img1}
            alt={productData.category}
            className="w-100"
          />
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="px-5 pt-lg-5 pb-2">
            <h5 className="fw-bold mb-1">{productData.name}</h5>
            <p className="mb-1">
              {props.transformPrice(productData.price)} VND
            </p>
            <span className={`${classes.desc} text-secondary`}>
              {productData.short_desc}
            </span>
            <br />
          </div>
          <Button
            className="px-4 py-1 ms-4 mt-3 fs-6"
            onClick={viewDetailBtnHandler}
          >
            <FontAwesomeIcon icon={faCartShopping} className="fs-6 me-2" />
            View detail
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default Popup;
