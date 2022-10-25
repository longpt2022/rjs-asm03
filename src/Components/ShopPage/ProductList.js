import useHttp from 'hooks/use-http';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

import ShopSideBar from './ShopSideBar';
import classes from './ProductList.module.css';
import LoadingSpinner from 'Components/UI/LoadingSpinner/LoadingSpinner';

// Hàm chuyển đổi thành dạng chuỗi và bổ sung các dấu chấm ngăn cách giữa các đơn vị
const transformPrice = string => {
  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const ProductList = () => {
  // State lưu kết quả lọc sau khi fetch
  const [productsData, setProductsData] = useState([]);
  // console.log(productsData);

  // Lấy ra url cần Fetch từ state redux
  const urlFetch = useSelector(state => state.products.url);

  // State lưu category cần lọc
  const [category, setCategory] = useState('All');

  const [totalResult, setTotalResult] = useState(null);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // console.log(data.length);

      // Lưu tổng số kết quả trả về
      setTotalResult(data.length);

      // Xử lý data trả về qua category
      if (category === 'All') {
        // set data trả về vào local state
        setProductsData(data);
      } else if (category !== 'All') {
        // console.log(data);
        const filteredCategory = data.filter(product => {
          return product.category === category;
        });
        // console.log(filteredCategory);
        setProductsData(filteredCategory);
      }
    };

    fetchData(
      {
        url: urlFetch,
      },
      transformData
    );
  }, [fetchData, urlFetch, category]);

  return (
    <section className={`${classes.productList} mb-5`}>
      <div className="d-flex justify-content-between bg-light p-5 mb-4">
        <h4 className="p-4">SHOP</h4>
        <span className="p-4 text-secondary">SHOP</span>
      </div>
      <div className="row mb-lg-4">
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <ShopSideBar setCategory={setCategory} />
        </div>

        <div className="col-lg-9 mb-4 mb-lg-0">
          <div>
            <div className={classes.headList}>
              <input type="text" placeholder="Enter search here" />
              <button className="px-1">
                Default sorting
                <FontAwesomeIcon icon={faAngleDown} className="ms-4" />
              </button>
            </div>
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
              productsData.length !== 0 &&
              productsData.map(product => {
                return (
                  <div
                    key={product._id.$oid}
                    className={`${classes['zoom-in']} col-lg-4 col-md-12 mb-4 mb-lg-3 text-center`}
                  >
                    <img
                      src={product.img1}
                      alt={product.category}
                      className="w-100 mb-3 main-animation"
                      // onClick={}
                    />
                    <p className="fw-bold mb-1">{product.name}</p>
                    <span className="text-secondary">
                      {transformPrice(product.price)}
                    </span>
                  </div>
                );
              })}
            {!isLoading && !error && productsData.length === 0 && (
              <p className="centered">Chưa có sản phẩm nào!</p>
            )}
          </div>

          <div>
            <div className={`${classes.totalResult} mb-2`}>
              <button>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
              </button>
              <div className="bg-dark text-white p-2 px-3 mx-1">1</div>
              <button>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>
            </div>
            <span className={classes.totalResult}>
              Showing {productsData.length} of {totalResult} results
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
