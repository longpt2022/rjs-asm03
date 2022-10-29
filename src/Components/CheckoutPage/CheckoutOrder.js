import classes from './CheckoutOrder.module.css';

const CheckoutOrder = props => {
  return (
    <div className={`${classes.CheckoutOrder} bg-light p-5`}>
      <h4 className="mb-3">YOUR ORDER</h4>

      {props.listCart.map(cart => {
        return (
          <div className={`${classes.orderItem} row`} key={cart._id.$oid}>
            <b className="col-xxl-6">{cart.name}</b>
            <span className="col-xxl-6 text-end text-secondary">
              {props.transformPrice(cart.price)} VNDx{cart.quantity}
            </span>
          </div>
        );
      })}

      <div
        className={`${classes.totalPrice} pt-3 d-flex justify-content-between`}
      >
        <b>TOTAL</b>
        <p className="fs-5">{props.transformPrice(props.totalQuantity)} VND</p>
      </div>
    </div>
  );
};

export default CheckoutOrder;
