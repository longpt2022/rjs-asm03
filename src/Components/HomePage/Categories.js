import { useNavigate } from 'react-router-dom';

import Product1 from '../../img/product_1.png';
import Product2 from '../../img/product_2.png';
import Product3 from '../../img/product_3.png';
import Product4 from '../../img/product_4.png';
import Product5 from '../../img/product_5.png';

const Categories = () => {
  const navigate = useNavigate();

  // Hàm tạo img category
  const categoryImg = (src, num) => {
    return (
      <img
        src={src}
        className="w-100 main-animation"
        alt={`Product ${num}`}
        onClick={() => navigate('/shop')}
      />
    );
  };

  return (
    <section className="mb-5">
      <div className="text-center mb-4">
        <span className="text-secondary">CAREFULLY CREATED COLLECTIONS</span>
        <h4>BROWSE OUR CATEGORIES</h4>
      </div>
      <div className="row mb-lg-4">
        <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
          {categoryImg(Product1, '1')}
        </div>

        <div className="col-lg-6 mb-4 mb-lg-0">
          {categoryImg(Product2, '2')}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          {categoryImg(Product3, '3')}
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          {categoryImg(Product4, '4')}
        </div>

        <div className="col-lg-4 mb-4 mb-lg-0">
          {categoryImg(Product5, '5')}
        </div>
      </div>
    </section>
  );
};

export default Categories;
