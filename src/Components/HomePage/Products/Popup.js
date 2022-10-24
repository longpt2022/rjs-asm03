import { useSelector, useDispatch } from 'react-redux';
import { popupActions } from 'store/index';

const Popup = props => {
  // Dùng redux state hiển thị popup
  const dispatch = useDispatch();
  const data = useSelector(state => state.popup.data);

  const hidePopupHandler = () => {
    dispatch(popupActions.HIDE_POPUP());
  };

  return (
    <div className="col-lg-3 col-md-12 mb-4 mb-lg-3 text-center">
      <img
        src={data.img1}
        alt={data.category}
        className="w-100 mb-3 main-animation"
      />
      <p className="fw-bold mb-1">{data.name}</p>
      <span className="text-secondary">{props.transformPrice(data.price)}</span>
    </div>
  );
};
export default Popup;
