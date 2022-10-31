import { useSelector } from 'react-redux';

import classes from './ProfileOrder.module.css';
import ProfileOrderProduct from './ProfileOrderProduct';

// Hàm chuyển đổi thành dạng chuỗi và bổ sung các dấu chấm ngăn cách giữa các đơn vị
const transformPrice = txt => {
  return String(txt).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const ProfileOrder = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  // console.log(currentUser);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-right">History orders</h4>
      </div>
      {currentUser.orders.length !== 0 && (
        <ul className={classes.profileOrder}>
          <li className="row gx-0 bg-light text-center pt-3 pb-2">
            <h6 className="col-3">PRODUCTS</h6>
            <h6 className="col-2">PRICE</h6>
            <h6 className="col-2">QUANTITY</h6>
            <h6 className="col-2">TOTAL</h6>
            <h6 className="col-3">DATE</h6>
          </li>
          {currentUser.orders.map(order => {
            return (
              <li key={Math.random()} className="row gx-0 mt-3">
                <div className="col-7">
                  <ProfileOrderProduct
                    products={order.products}
                    transformPrice={transformPrice}
                  />
                </div>
                <p className="col-2 mb-1 text-secondary">
                  {transformPrice(order.total)} VND
                </p>
                <p className="col-3">{order.date}</p>
              </li>
            );
          })}
        </ul>
      )}
      {currentUser.orders.length === 0 && (
        <p className="centered">Bạn chưa đặt đơn hàng nào!</p>
      )}
    </>
  );
};

export default ProfileOrder;
