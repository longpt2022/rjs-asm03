import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import Popup from './Products/Popup';
import { popupActions } from 'store/index';

const Products = () => {
  // State lưu kết quả fetch
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productsData, setProductsData] = useState([]);
  // console.log(productsData);

  //  Hàm fetch xử lý api
  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74'
      );

      // Nếu gặp lỗi thả ra lỗi
      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      // set data trả về với 8 phần tử đầu tiên
      setProductsData(data.slice(0, 8));
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // Hàm chuyển đổi thành dạng chuỗi vào bổ sung các dấu chấm ngăn cách giữa các đơn vị
  const transformPrice = string => {
    return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Dùng redux hiển thị popup
  const dispatch = useDispatch();
  const isShowPopup = useSelector(state => state.popup.isShow);

  const showPopupHandler = product => {
    dispatch(popupActions.SHOW_POPUP(product));
  };

  return (
    <section className="mb-5">
      {isShowPopup && <Popup transformPrice={transformPrice} />}

      <div className="mb-4">
        <span className="text-secondary">MADE THE HARD WAY</span>
        <h4>TOP TRENDING PRODUCTS</h4>
      </div>
      <div className="row">
        {isLoading && (
          <div className="centered">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading &&
          !error &&
          productsData.map(product => {
            return (
              <div
                key={product._id.$oid}
                className="col-lg-3 col-md-12 mb-4 mb-lg-3 text-center"
              >
                <img
                  src={product.img1}
                  alt={product.category}
                  className="w-100 mb-3 main-animation"
                  onClick={showPopupHandler.bind(this, product)}
                />
                <p className="fw-bold mb-1">{product.name}</p>
                <span className="text-secondary">
                  {transformPrice(product.price)}
                </span>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Products;
