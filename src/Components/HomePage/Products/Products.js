import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useHttp from 'hooks/use-http';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import Popup from './Popup';
import { popupActions } from 'store/popup';

// Hàm chuyển đổi thành dạng chuỗi và bổ sung các dấu chấm ngăn cách giữa các đơn vị
const transformPrice = string => {
  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const Products = () => {
  const dispatch = useDispatch();

  // State lưu kết quả fetch
  const [productsData, setProductsData] = useState([]);
  // console.log(productsData);

  // Lấy ra url cần Fetch từ state redux
  const urlFetch = useSelector(state => state.products.url);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // set data trả về với 8 phần tử đầu tiên
      setProductsData(data.slice(0, 8));
    };

    fetchData(
      {
        url: urlFetch,
      },
      transformData
    );
  }, [fetchData, urlFetch]);

  // Dùng redux lấy state hiển thị popup
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
