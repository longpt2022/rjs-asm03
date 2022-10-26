import { useNavigate } from 'react-router-dom';

const RelatedProduct = props => {
  const navigate = useNavigate();

  return (
    <div>
      <h6 className="mt-5 mb-4">RELATED PRODUCTS</h6>
      <div className="row">
        {props.otherProducts.length !== 0 &&
          props.otherProducts.map(product => {
            return (
              <div
                key={product._id.$oid}
                className="col-lg-2 col-md-12 mb-4 mb-lg-3 text-center"
              >
                <img
                  src={product.img1}
                  alt={product.category}
                  className="w-100 mb-3 main-animation border"
                  onClick={() => navigate(`/detail/${product._id.$oid}`)}
                />
                <p className="fw-bold mb-1">{product.name}</p>
                <span className="text-secondary">
                  {props.transformPrice(product.price)} VND
                </span>
              </div>
            );
          })}
        {props.otherProducts.length === 0 && (
          <p className="text-secondary">- Chưa có sản phẩm liên quan</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
