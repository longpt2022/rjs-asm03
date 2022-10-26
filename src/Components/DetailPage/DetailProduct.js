import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import useHttp from 'hooks/use-http';
import LoadingSpinner from 'Components/UI/LoadingSpinner/LoadingSpinner';
import DetailProductImages from './DetailProductImages';
import ProductDescription from './ProductDescription';
import RelatedProduct from './RelatedProduct';
// import DetailProductForm from './DetailProductForm';

// Hàm chuyển đổi thành dạng chuỗi và bổ sung các dấu chấm ngăn cách giữa các đơn vị
const transformPrice = txt => {
  return String(txt).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const DetailProduct = () => {
  // Lấy thông tin url bằng useParams()
  const params = useParams();

  // State lưu kết quả lọc sau khi fetch
  const [productData, setProductData] = useState({});

  // State lưu kết các product liên quan khác
  const [otherProducts, setOtherProducts] = useState([]);

  // Lấy ra url cần Fetch từ state redux
  const urlFetch = useSelector(state => state.products.url);

  //--- dùng custom hooks: useHttp()
  const { isLoading, error, sendRequest: fetchData } = useHttp();

  useEffect(() => {
    const transformData = data => {
      // lọc product cần xem qua id trả về từ url
      const filteredProduct = data.filter(product => {
        return product._id.$oid === params.id;
      });

      // Lưu kết quả vào state
      setProductData(filteredProduct[0]);

      // lọc các product liên quan khác
      const filteredOtherProducts = data.filter(product => {
        return (
          // nếu trùng category và khác id
          product.category === filteredProduct[0].category &&
          product._id.$oid !== filteredProduct[0]._id.$oid
        );
      });
      setOtherProducts(filteredOtherProducts);
    };

    fetchData(
      {
        url: urlFetch,
      },
      transformData
    );
  }, [fetchData, urlFetch, params.id]);

  // tự động scroll về đầu trang nếu id thay đổi khi click related product
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  return (
    <>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && error && <p>{error}</p>}

      {!isLoading && !error && (
        <section className="mb-5 mt-4">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <DetailProductImages
                img1={productData.img1}
                img2={productData.img2}
                img3={productData.img3}
                img4={productData.img4}
              />
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="px-5 pt-lg-2 pb-2">
                <h2 className="fw-bold pt-4 mb-4">{productData.name}</h2>
                <p className="mb-4 fs-5">
                  {transformPrice(productData.price)} VND
                </p>
                <span className="text-secondary lh-lg">
                  {productData.short_desc}
                </span>
                <br />
                <p className="fw-bold mt-3">
                  CATEGORY:
                  <span className="text-secondary ms-2">
                    {productData.category}
                  </span>
                </p>
              </div>
              {/* <DetailProductForm /> */}
            </div>
          </div>

          <ProductDescription desc={productData.long_desc} />

          <RelatedProduct
            otherProducts={otherProducts}
            transformPrice={transformPrice}
          />
        </section>
      )}
    </>
  );
};

export default DetailProduct;
